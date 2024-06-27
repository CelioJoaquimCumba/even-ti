import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { EventLite } from '@/data/types'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const events = await prisma.event.findMany()
  console.log(events)
  return Response.json(events)
}