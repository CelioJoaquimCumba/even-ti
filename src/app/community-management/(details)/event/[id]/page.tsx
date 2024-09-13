'use client'

import { getEventById } from '@/app/actions/event'
import { Button } from '@/app/components/atoms/button'

import ParticipantsList from '@/app/community-management/(details)/event/[id]/participantsList'
import { Event } from '@/data/types'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import EventPreview from './eventPreview'

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event>()
  const router = useRouter()
  const { id } = params
  const [loadingEvent, setLoadingEvent] = useState(true)

  useEffect(() => {
    ;(async function () {
      try {
        setLoadingEvent(true)
        const response = await getEventById(id)
        if (!response || !response == null) {
          throw new Error('Event not found')
          return
        }
        setEvent(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingEvent(false)
      }
    })()
  }, [id])
  return (
    <div className="flex flex-col pt-2 pb-8 px-6 bg-secondary overflow-hidden w-full h-full gap-2 md:gap-6">
      {!loadingEvent && event && (
        <header className="flex self-stretch justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={'outline'}
              size={'icon'}
              className={`rounded-full md:flex`}
              onClick={() => router.back()}
            >
              <ChevronLeft />
            </Button>
            <h1 className="text-lg md:text-2xl text-gray-700">{event.title}</h1>
          </div>
          <Button className="px-8 py-4" onClick={() => {}}>
            Marcar Presenças
          </Button>
        </header>
      )}
      <main className="flex flex-col gap-4 flex-grow overflow-y-auto">
        <ParticipantsList event={event} />
        <EventPreview event={event} loading={loadingEvent} />
      </main>
    </div>
  )
}
