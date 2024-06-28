import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../lib/prisma'
import { EventLite } from '@/data/types'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const eventsWithSpeakers = await prisma.event.findMany({
    include: {
      speakers: {
        include: {
          speaker: true
        }
      }
    },
  });
  return NextResponse.json(eventsWithSpeakers)
}