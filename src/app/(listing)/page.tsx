'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/atoms/pagination'
import { EventCard } from '@/app/components/molecules/event-card'
import { usePage } from '@/app/providers/TitleContext'
import { EventLite, PaginationMeta } from '@/data/types'
import { convertDate } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { EventCardLoader } from '../components/molecules/event-card-loader'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<EventLite[]>()
  const [meta, setMeta] = useState<PaginationMeta>({
    totalCount: 0,
    page: 0,
    pageSize: 0,
    totalPages: 0,
  })
  const { setTitle, search, page, setPage } = usePage()
  useEffect(() => {
    setTitle('Eventos')
  })
  useEffect(() => {
    ;(async function () {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/event?${search && new URLSearchParams({ search }) + '&'}${new URLSearchParams({ page: page.toString() })}`,
          {
            method: 'GET',
          },
        )
        const data = await response.json()
        setMeta({
          totalCount: data.totalCount,
          page: data.page,
          pageSize: data.pageSize,
          totalPages: data.totalPages,
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responseEvents: EventLite[] = data.events.map((event: any) => ({
          ...event,
          date: convertDate(event.date.toString()),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          speakers: event.speakers.map((speaker: any) => ({
            id: speaker.speaker.id,
            name: speaker.speaker.name,
            image: speaker.speaker.image,
          })),
        }))
        setEvents(responseEvents)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [search, page])
  return (
    <main className="flex w-full h-full flex-col items-center gap-2 md:gap-6 bg-white rounded-2xl overflow-y-auto">
      {isLoading ? (
        [1, 2].map((_event, index) => <EventCardLoader key={index} />)
      ) : !events || events.length === 0 ? (
        'Resultados não encontrados'
      ) : (
        <>
          <div className="flex flex-col h-full w-full gap-2 md:gap-6 overflow-y-auto ">
            {events.map((event: EventLite) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              {meta.page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(meta.page - 1)} />
                </PaginationItem>
              )}
              {[...Array(meta.totalPages)].map((_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    isActive={index + 1 === meta.page}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {meta.page < meta.totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(meta.page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </main>
  )
}
