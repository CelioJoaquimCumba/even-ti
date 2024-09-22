'use server'
import { PaginationMeta, User } from '@/data/types'
import prisma from '@/lib/prisma'

export async function getSpeakers(props: {
  search?: string
  page?: number
  pageSize?: number
  unpaged?: boolean
  communityId?: string
}): Promise<{ speakers: User[]; paginationMeta: PaginationMeta }> {
  const { search = '', page = 1, pageSize = 10, unpaged, communityId } = props
  const skip = unpaged ? undefined : (page - 1) * pageSize
  const take = unpaged ? undefined : pageSize
  const totalCount = await prisma.user.count({
    where: {
      AND: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          communities: {
            some: {
              communityId: {
                equals: communityId,
              },
            },
          },
        },
      ],
    },
    skip,
    take,
  })
  const speakers = await prisma.user.findMany({
    where: {
      AND: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          communities: {
            some: {
              communityId: {
                equals: communityId,
              },
            },
          },
        },
      ],
    },
    skip,
    take,
  })
  const response = {
    speakers,
    paginationMeta: {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  }
  return response
}
