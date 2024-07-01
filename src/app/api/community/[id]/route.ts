import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } },
  res: NextApiResponse,
) {
  const {id} = params
  const Community = await prisma.community.findFirst({
    where: {
      id
    },
    include: {
      members: {
        include: {
          member: true
        }
      },
      events: {
        include: {
          event: true
        },
        take: 3
      },
      partners: {
        include: {
          partner: true
        }
      }
    },
  });
  const response = {
    community: Community
  }
  return NextResponse.json(response)
}