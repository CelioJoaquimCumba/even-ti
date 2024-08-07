import type { NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest, _res: NextApiResponse) {
  const search = req.nextUrl.searchParams.get('search') || ''
  const page = Number(req.nextUrl.searchParams.get('page')) || 1
  const pageSize = 10
  const totalCount = await prisma.event.count({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          community: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
  })
  const skip = (page - 1) * pageSize
  const take = pageSize
  const eventsWithSpeakers = await prisma.event.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          community: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      speakers: {
        include: {
          speaker: true,
        },
      },
    },
    skip,
    take,
  })
  const response = {
    events: eventsWithSpeakers,
    totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
  }
  return NextResponse.json(response)
}
