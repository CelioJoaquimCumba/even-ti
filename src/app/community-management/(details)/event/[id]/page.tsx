'use client'

import { cancelEvent, getEventById } from '@/app/actions/event'
import { Button } from '@/app/components/atoms/button'

import ParticipantsList from '@/app/community-management/(details)/event/[id]/participantsList'
import { Event } from '@/data/types'
import { ChevronLeft, ListChecks, Pencil, CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import EventPreview from './eventPreview'
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/app/components/molecules/dropdown-menu'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { routes } from '@/data/routes'
import { usePage } from '@/app/providers/PageContext'

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event>()
  const { id } = params
  const [loadingEvent, setLoadingEvent] = useState(true)
  const router = useRouter()
  const { space } = usePage()
  useEffect(() => {
    if (!space) {
      // Redirect to the desired path if spaces is not defined
      router.push('/') // replace with the desired path
    }
  }, [space, router])

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
  const handleEventCancelation = async () => {
    try {
      console.log('here')
      if (!event) throw new Error('Event not found')
      await cancelEvent(event.id)
      router.push(routes.communityEvents.path)
    } catch {
      console.log('error canceling event')
    }
  }
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
          <div className="flex gap-2">
            <Button
              className="px-8 py-4"
              onClick={() =>
                router.push(`/community-management/event/${event.id}/`)
              }
            >
              <ListChecks className="w-4 h-4" />
              <span>Marcar Presenças</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup className="flex flex-col">
                  <DropdownMenuItem>
                    <Button
                      variant={'ghost'}
                      className="px-8 py-4 gap-2 flex-grow"
                      onClick={() =>
                        router.push(
                          `/community-management/event/edit/${event.id}`,
                        )
                      }
                    >
                      <Pencil className="w-4 h-4" />
                      <span>Editar evento</span>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant={'destructive'}
                      className="px-8 py-4 gap-2 flex-grow"
                      onClick={() => handleEventCancelation()}
                    >
                      <CircleX className="w-4 h-4" />
                      <span>Cancelar evento</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      )}
      <main className="flex flex-col gap-4 flex-grow overflow-y-auto">
        <ParticipantsList event={event} />
        <EventPreview event={event} loading={loadingEvent} />
      </main>
    </div>
  )
}
