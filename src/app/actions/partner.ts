'use server'
import { PaginationMeta, Partner } from '@/data/types'
import prisma from '@/lib/prisma'

export async function getPartners(props: {
  search?: string
  page?: number
  pageSize?: number
  unpaged?: boolean
  communityId?: string
}): Promise<{ partners: Partner[]; paginationMeta: PaginationMeta }> {
  const { search = '', page = 1, pageSize = 10, unpaged, communityId } = props
  const skip = unpaged ? undefined : (page - 1) * pageSize
  const take = unpaged ? undefined : pageSize
  const totalCount = await prisma.partner.count({
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
  const partners = await prisma.partner.findMany({
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
    partners,
    paginationMeta: {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  }
  return response
}
