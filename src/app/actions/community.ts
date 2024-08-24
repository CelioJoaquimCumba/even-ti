'use server'
import { Community, CommunityLite, PaginationMeta } from '@/data/types'
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
export async function getCommunityById(id: string): Promise<Community | null> {
  const community = await prisma.community.findFirst({
    where: {
      id,
    },
    include: {
      members: {
        include: {
          member: true,
        },
      },
      events: {
        include: {
          event: true,
        },
        take: 3,
      },
      partners: {
        include: {
          partner: true,
        },
      },
    },
  })
  if (!community) return null
  const responseCommunity: Community = {
    ...community,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    members: community.members.map((member: any) => ({
      id: member.member.id,
      name: member.member.name,
      image: member.member.image,
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: community.events.map((event: any) => ({
      ...event.event,
      date: convertDate(event.event.date.toString()),
      id: event.event.id,
      name: event.event.name,
      image: event.event.image,
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    partners: community.partners.map((partner: any) => ({
      id: partner.partner.id,
      name: partner.partner.name,
      image: partner.partner.image,
    })),
  }
  return responseCommunity
}
export async function getMyCommunities(
  userId: string,
): Promise<{ name: string; id: string }[] | null> {
  const communities = await prisma.community.findMany({
    where: {
      members: {
        some: {
          memberId: {
            equals: userId,
          },
        },
      },
    },
  })
  if (!communities) return null
  return communities.map((community) => ({
    name: community.name,
    id: community.id,
  }))
}
