import type {  NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  res: NextApiResponse,
) {
  const search = req.nextUrl.searchParams.get('search') || ''
  const page = Number(req.nextUrl.searchParams.get('page')) || 1;
  const pageSize = 10;
  const totalCount = await prisma.community.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ]
    }
  });
  const skip = (page -1) * pageSize
  const take = pageSize
  const communities = await prisma.community.findMany({
    where: {
      OR: [
        {
          name: {
          contains: search,
          mode: 'insensitive'
          }
        }
      ]
    },
    skip: skip,
    take: take,
  });
  const response = {
    communities: communities,
    totalCount: totalCount,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(totalCount / pageSize)
  }
  return NextResponse.json(response)
}