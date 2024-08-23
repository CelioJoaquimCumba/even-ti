'use server'
import { CommunityLite, Event, PaginationMeta } from '@/data/types'
import prisma from '@/lib/prisma'
import { convertDate } from '@/lib/utils'

export async function getCommunities(props: {
  search?: string
  page?: number
  pageSize?: number
}): Promise<{ communities: CommunityLite[]; paginationMeta: PaginationMeta }> {
  const { search = '', page = 1, pageSize = 10 } = props
  const skip = (page - 1) * pageSize
  const take = pageSize
  const totalCount = await prisma.community.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
  })
  const communities = await prisma.community.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
    skip,
    take,
  })
  const response = {
    communities,
    paginationMeta: {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  }
  return response
}
export async function getEventById(id: string): Promise<Event | null> {
  const eventsWithSpeakers = await prisma.event.findFirst({
    where: {
      id,
    },
    include: {
      speakers: {
        include: {
          speaker: true,
        },
      },
      organizers: {
        include: {
          community: true,
        },
      },
      partners: {
        include: {
          partner: true,
        },
      },
    },
  })
  if (!eventsWithSpeakers) return null
  const event: Event = {
    ...eventsWithSpeakers,
    date: convertDate(eventsWithSpeakers.date.toDateString()),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    speakers: eventsWithSpeakers.speakers.map((speaker: any) => ({
      id: speaker.speaker.id,
      name: speaker.speaker.name,
      image: speaker.speaker.image,
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    organizers: eventsWithSpeakers.organizers.map((organizer: any) => ({
      id: organizer.community.id,
      name: organizer.community.name,
      image: organizer.community.image,
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    partners: eventsWithSpeakers.partners.map((partner: any) => ({
      id: partner.partner.id,
      name: partner.partner.name,
      image: partner.partner.image,
    })),
  }
  return event
}
