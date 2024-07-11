import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { errorMessages } from '@/data/messages/errorMessages'

export async function DELETE(req: NextRequest) {
  try {
    const { userId, eventId } = await req.json()

    // Validate request body
    if (!userId || !eventId) {
      return NextResponse.json(
        { error: errorMessages.missingRequiredFields },
        { status: 400 },
      )
    }

    // Find the reservation
    const reservation = await prisma.reservation.findFirst({
      where: {
        userId: {
          equals: userId,
        },
        eventId: {
          equals: eventId,
        },
      },
    })

    if (!reservation) {
      return NextResponse.json(
        { error: errorMessages.reservationNotFound },
        { status: 404 },
      )
    }

    // Delete the reservation
    await prisma.reservation.delete({
      where: {
        id: reservation.id,
      },
    })

    return NextResponse.json(
      { message: 'Reservation deleted successfully' },
      { status: 200 },
    )
  } catch (e) {
    console.error('Internal server error', e) // Log the error for debugging
    return NextResponse.json(
      { error: errorMessages.internalServerError },
      { status: 500 },
    )
  }
}
