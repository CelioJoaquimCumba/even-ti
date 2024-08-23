'use server'
import { EventLite, PaginationMeta } from '@/data/types'
import prisma from '@/lib/prisma'
import { convertDate } from '@/lib/utils'

export async function getEvents(props: {
  search?: string
  page?: number
  pageSize?: number
}): Promise<{ events: EventLite[]; paginationMeta: PaginationMeta }> {
  const { search = '', page = 1, pageSize = 10 } = props
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events: EventLite[] = eventsWithSpeakers.map((event: any) => ({
    ...event,
    date: convertDate(event.date.toString()),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    speakers: event.speakers.map((speaker: any) => ({
      id: speaker.speaker.id,
      name: speaker.speaker.name,
      image: speaker.speaker.image,
    })),
  }))
  const response = {
    events,
    paginationMeta: {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  }
  return response
}
