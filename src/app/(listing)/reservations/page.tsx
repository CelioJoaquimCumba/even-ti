'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/atoms/pagination'
import { ReservationCard } from '@/app/components/molecules/reservation-card'
import { usePage } from '@/app/providers/PageContext'
import { PaginationMeta, Reservation } from '@/data/types'
import { useEffect, useState } from 'react'
import { EventCardLoader } from '@/app/components/molecules/event-card-loader'
import { useUser } from '@auth0/nextjs-auth0/client'
import { getReservations } from '@/app/actions/reservations'

export default function Home() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [reservations, setReservations] = useState<Reservation[]>()
  const [meta, setMeta] = useState<PaginationMeta>({
    totalCount: 0,
    page: 0,
    pageSize: 0,
    totalPages: 0,
  })
  const { setTitle, search, page, setPage } = usePage()
  useEffect(() => {
    setTitle('Reservas')
  })
  useEffect(() => {
    ;(async function () {
      try {
        if (!user) return
        setIsLoading(true)
        const response = await getReservations({
          userId:
            (user && user.sub && user.sub.toString().replace('auth0|', '')) ||
            '',
          search,
          page,
        })
        setMeta(response.paginationMeta)
        setReservations(response.reservations)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [search, page, user])
  return (
    <main className="flex w-full h-full flex-col gap-2 md:gap-6 bg-white rounded-2xl overflow-y-auto">
      {isLoading ? (
        [1, 2].map((_event, index) => <EventCardLoader key={index} />)
      ) : !reservations || reservations.length === 0 ? (
        'Resultados não encontrados'
      ) : (
        <>
          <div className="flex flex-col h-full w-full gap-2 md:gap-6 overflow-y-auto ">
            {reservations.map((reservation: Reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
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
