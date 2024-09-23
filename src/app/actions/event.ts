'use server'
import { Event, EventLite, PaginationMeta, User } from '@/data/types'
import prisma from '@/lib/prisma'

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
    date: event.date,
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
    date: eventsWithSpeakers.date,
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

export async function createEvent(event: Event, communityId: string) {
  if (!communityId) return
  try {
    const eventData = await prisma.event.create({
      data: {
        community: event.community,
        title: event.title,
        background: event.background,
        logo: event.logo,
        tagLine: event.tagLine,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        tickets: event.tickets,
        objectives: event.objectives,
      },
    })
    await prisma.eventOrganizer.create({
      data: {
        eventId: eventData.id,
        organizerId: communityId,
      },
    })
    await prisma.eventSpeaker.createMany({
      data: event.speakers.map((speaker) => ({
        speakerId: speaker.id,
        eventId: eventData.id,
      })),
    })
    await prisma.eventPartner.createMany({
      data: event.partners.map((partner) => ({
        partnerId: partner.id,
        eventId: eventData.id,
      })),
    })
    return eventData
  } catch (error) {
    console.log(error)
  }
}

export async function editEvent(
  eventId: string,
  event: Event,
  communityId: string,
) {
  if (!communityId) return
  if (!eventId) return

  try {
    // Update the event details
    const updatedEvent = await prisma.event.update({
      where: { id: eventId }, // Find the event by ID
      data: {
        community: event.community,
        title: event.title,
        background: event.background,
        logo: event.logo,
        tagLine: event.tagLine,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        tickets: event.tickets,
        objectives: event.objectives,
      },
    })

    // Remove old speakers and add new ones
    await prisma.eventSpeaker.deleteMany({
      where: { eventId: updatedEvent.id },
    })
    await prisma.eventSpeaker.createMany({
      data: event.speakers.map((speaker) => ({
        speakerId: speaker.id,
        eventId: updatedEvent.id,
      })),
    })

    // Remove old partners and add new ones
    await prisma.eventPartner.deleteMany({
      where: { eventId: updatedEvent.id },
    })
    await prisma.eventPartner.createMany({
      data: event.partners.map((partner) => ({
        partnerId: partner.id,
        eventId: updatedEvent.id,
      })),
    })

    return updatedEvent
  } catch (error) {
    console.log('Error updating event:', error)
  }
}
