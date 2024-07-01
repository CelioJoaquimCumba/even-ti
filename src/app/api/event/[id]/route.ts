import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
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
  const eventsWithSpeakers = await prisma.event.findFirst({
    where: {
      id
    },
    include: {
      speakers: {
        include: {
          speaker: true
        }
      },
      organizers: {
        include: {
          community: true
        }
      },
      partners: {
        include: {
          partner: true
        }
      }
    },
  });
  const response = {
    event: eventsWithSpeakers
  }
  return NextResponse.json(response)
}