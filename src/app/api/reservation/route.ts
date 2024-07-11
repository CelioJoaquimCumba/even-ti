import type { NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { errorMessages } from '@/data/messages/errorMessages'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest, _res: NextApiResponse) {
  // const search = req.nextUrl.searchParams.get('search') || ''
  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId) return
  const page = Number(req.nextUrl.searchParams.get('page')) || 1
  const pageSize = 10
  const totalCount = await prisma.reservation.count()
  const skip = (page - 1) * pageSize
  const take = pageSize
  const reservationsWithSpeakers = await prisma.reservation.findMany({
    where: {
      userId,
    },
    include: {
      event: true,
    },
    skip,
    take,
  })
  const response = {
    reservations: reservationsWithSpeakers,
    totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
  }
  return NextResponse.json(response)
}

export async function POST(req: NextRequest) {
  const { userId, eventId } = await req.json()

  if (!userId || !eventId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    )
  }

  try {
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        userId,
        eventId,
      },
    })

    if (existingReservation) {
      return NextResponse.json(
        { error: errorMessages.userAlreadyReservedEvent },
        { status: 400 },
      )
    }

    let code = ''
    let unique = false
    while (!unique) {
      code = nanoid(10) // Generate a 10-character unique code
      const existingCode = await prisma.reservation.findFirst({
        where: {
          code,
        },
      })
      if (!existingCode) {
        unique = true
      }
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        eventId,
        code,
      },
    })

    return NextResponse.json({ reservation }, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: errorMessages.internalServerError },
      { status: 500 },
    )
  }
}
