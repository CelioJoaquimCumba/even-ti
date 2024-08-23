'use server'
import prisma from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { errorMessages } from '@/data/messages/errorMessages'
import { PaginationMeta, Reservation } from '@/data/types'
import { convertDate } from '@/lib/utils'

export async function getReservations(props: {
  search?: string
  page?: number
  pageSize?: number
  userId: string
}): Promise<{ reservations: Reservation[]; paginationMeta: PaginationMeta }> {
  const { search = '', page = 1, pageSize = 10, userId } = props
  if (!userId)
    return {
      reservations: [],
      paginationMeta: { totalCount: 0, page: 1, pageSize: 10, totalPages: 0 },
    }
  const totalCount = await prisma.reservation.count({
    where: {
      userId,
    },
  })
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
  const reservations: Reservation[] = reservationsWithSpeakers.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (reservation: any) => ({
      ...reservation,
      event: {
        ...reservation.event,
        date: convertDate(reservation.event.date.toString()),
      },
    }),
  )
  const response = {
    reservations,
    paginationMeta: {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  }
  return response
}

export async function makeReservation(props: {
  userId?: string
  eventId?: string
}): Promise<Reservation | void> {
  const { userId, eventId } = props

  if (!userId || !eventId) {
    return
  }

  const existingReservation = await prisma.reservation.findFirst({
    where: {
      userId,
      eventId,
    },
  })

  if (existingReservation) {
    throw new Error(errorMessages.userAlreadyReservedEvent)
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

  await prisma.reservation.create({
    data: {
      userId,
      eventId,
      code,
    },
  })
}
