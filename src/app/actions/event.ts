'use server'
import { Event, EventLite, PaginationMeta, User } from '@/data/types'
import prisma from '@/lib/prisma'
import { convertDate } from '@/lib/utils'

type filter = {
  communityId?: string
}

export async function getEvents(props: {
  search?: string
  page?: number
  pageSize?: number
  filter?: filter
}): Promise<{ events: EventLite[]; paginationMeta: PaginationMeta }> {
  const { search = '', page = 1, pageSize = 10, filter } = props
  const { communityId } = filter || {}

  // Filter condition for communityId, accessed via EventOrganizer relation
  const communityFilter = communityId
    ? { organizers: { some: { community: { id: communityId } } } }
    : {}

  // Count total events matching the criteria
  const totalCount = await prisma.event.count({
    where: {
      AND: [
        communityFilter,
        {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              community: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          ],
        },
      ],
    },
  })

  const skip = (page - 1) * pageSize
  const take = pageSize

  // Fetch events with speakers and apply filters
  const eventsWithSpeakers = await prisma.event.findMany({
    where: {
      AND: [
        communityFilter,
        {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              community: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          ],
        },
      ],
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
    },
    skip,
    take,
  })

  // Process the events data
  const events: EventLite[] = eventsWithSpeakers.map((event) => ({
    ...event,
    date: convertDate(event.date.toString()),
    speakers: event.speakers.map((speaker) => ({
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

export async function getParticipantsOfEvent(props: {
  eventId: string
  page?: number
  pageSize?: number
  search?: string
}): Promise<{ participants: User[]; paginationMeta: PaginationMeta }> {
  const { eventId, page = 1, pageSize = 10, search = '' } = props

  // Calculate pagination parameters
  const skip = (page - 1) * pageSize
  const take = pageSize

  try {
    const totalCount = await prisma.reservation.count({
      where: {
        eventId,
        user: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive', // Case-insensitive search
              },
            },
            {
              email: {
                contains: search,
                mode: 'insensitive', // Case-insensitive search
              },
            },
          ],
        },
      },
    })

    // Fetch reservations with user details matching the search criteria for the specific event
    const reservations = await prisma.reservation.findMany({
      where: {
        eventId,
        user: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive', // Case-insensitive search
              },
            },
            {
              email: {
                contains: search,
                mode: 'insensitive', // Case-insensitive search
              },
            },
          ],
        },
      },
      include: {
        user: true, // Include user details
      },
      skip,
      take,
    })

    // Map the reservations to return the participant data
    const participants: User[] = reservations.map((reservation) => ({
      id: reservation.user.id,
      name: reservation.user.name,
      email: reservation.user.email,
      image: reservation.user.image,
    }))

    const paginationMeta: PaginationMeta = {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    }

    return { participants, paginationMeta }
  } catch (error) {
    console.error('Error fetching participants:', error)
    throw error
  }
}
