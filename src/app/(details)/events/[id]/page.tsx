'use client'

import { getEventById } from '@/app/actions/event'
import { makeReservation } from '@/app/actions/reservations'
import { Button } from '@/app/components/atoms/button'

import { Card, CardContent } from '@/app/components/atoms/card'
import { SpeakerCard } from '@/app/components/atoms/speaker-card'
import AuthenticateModal from '@/app/components/molecules/authenticate-modal'
import ErrorModal from '@/app/components/molecules/error-modal'
import ReserveEventModal from '@/app/components/molecules/reservation/reserve-event-modal'
import SuccessfulReservationEventModal from '@/app/components/molecules/reservation/successful-reservation-event-modal'
import { Event, ModalType } from '@/data/types'
import { convertDate } from '@/lib/utils'
import { useUser } from '@auth0/nextjs-auth0/client'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event>()
  const { user } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [typeModal, setTypeModal] = useState<ModalType>('error')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { id } = params
  const [loading, setLoading] = useState(true)
  const [reservationLoading, setReservationLoading] = useState(false)
  const handleCommunity = (id: string) => {
    router.push(`/community/${id}`)
  }
  const handleRequestReservation = async () => {
    try {
      setReservationLoading(true)
      await makeReservation({
        userId:
          (user && user.sub && user.sub.toString().replace('auth0|', '')) || '',
        eventId: id,
      })
      setErrorMessage('')
      setTypeModal('success')
    } catch (e) {
      const error = e as unknown as { message: string }
      setTypeModal('error')
      setErrorMessage(error.message)
    } finally {
      setReservationLoading(false)
    }
  }
  const goToReservation = () => {
    setShowModal(true)
    setTypeModal('reservation')
  }
  const toggleModal = () => {
    setTypeModal('reservation')
    setErrorMessage('')
    setShowModal(!showModal)
  }
  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        const response = await getEventById(id)
        if (!response || !response == null) {
          throw new Error('Event not found')
          return
        }
        setEvent(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])
  return (
    <div className="flex flex-col pt-2 pb-8 px-6 bg-secondary overflow-hidden w-full h-full gap-2 md:gap-6">
      {!loading && event && (
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
          <Button className="px-8 py-4" onClick={goToReservation}>
            Reservar bilhete
          </Button>
        </header>
      )}
      <main className="flex flex-grow overflow-hidden p-2 md:p-4 bg-white rounded-md">
        {loading ? (
          <section
            className={`flex flex-col self-stretch w-full animate-pulse rounded-md justify-center items-center text-white text-center gap-4 bg-cover`}
          >
            <div className="flex flex-col flex-grow self-stretch rounded-md justify-center items-center gap-4  py-24">
              <h2 className="bg-gray-200 animate-pulse h-6 rounded-full w-32"></h2>
              <p className=" bg-gray-200 animate-pulse h-8 rounded-full w-64 md:w-96"></p>
              <p className="bg-gray-200 animate-pulse h-6 rounded-full w-40"></p>
              <p className="bg-gray-200 animate-pulse h-6 rounded-full w-32"></p>
              <p className="bg-gray-200 animate-pulse h-6 rounded-full w-64"></p>
              <p className="bg-gray-200 animate-pulse h-6 rounded-full w-48"></p>
            </div>
          </section>
        ) : !event ? (
          'Algo de errado não está certo.'
        ) : (
          <div className="flex flex-col flex-grow self-stretch overflow-auto gap-4 md:gap-16">
            <section
              className={`flex flex-col self-stretch rounded-md justify-center items-center text-white text-center gap-4 bg-cover`}
              style={{ backgroundImage: `url(${event.background})` }}
            >
              <div className="flex flex-col flex-grow self-stretch rounded-md justify-center items-center gap-4 bg-black bg-opacity-50 py-24">
                <h2 className="text-2xl md:text-5xl">{event.title}</h2>
                <p className="md:text-2xl">{event.tagLine}</p>
                <p className="md:text-xl">
                  {convertDate(event?.date.toDateString())}, {event.time}
                </p>
                <p className="md:text-xl">{event.location}</p>
                <Button variant={'secondary'} onClick={goToReservation}>
                  Reservar bilhete
                </Button>
                <i>{event.tickets} bilhetes restantes</i>
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">O que é {event.title}</h3>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <Image
                  unoptimized
                  src={event.logo}
                  alt={event.title}
                  width={300}
                  height={300}
                  className=" w-full md:w-72 rounded-md"
                />
                <p className="md:text-lg">{event.description}</p>
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">Objectivos do evento</h3>
              <div className="flex flex-col md:flex-row gap-2 ">
                {event.objectives.map((objective, index) => (
                  <Card
                    key={index}
                    className="p-2 flex justify-center items-center"
                  >
                    <CardContent>{objective}</CardContent>
                  </Card>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">Speakers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                {event.speakers.map((speaker, index) => (
                  <SpeakerCard
                    className="w-full"
                    key={index}
                    speaker={{
                      id: speaker.id,
                      name: speaker.name,
                      image: speaker.image,
                    }}
                  />
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">{`Organizador${event.organizers.length > 1 ? 'es' : ''}`}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                {event.organizers.map((organizer) => (
                  <div
                    key={organizer.id}
                    style={{ backgroundImage: `url(${organizer.image})` }}
                    className=" w-full md:w-72 aspect-[4/3] bg-cover bg-center rounded-md"
                  >
                    <div className="flex w-full h-full justify-end items-end bg-black bg-opacity-10 p-4 ">
                      <Button
                        variant={'secondary'}
                        onClick={() => handleCommunity(organizer.id)}
                      >
                        Ver Comunidade
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">{`Parceiro${event.partners.length > 1 ? 's' : ''}`}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                {event.partners.map((partner) => (
                  <Image
                    unoptimized
                    key={partner.id}
                    src={partner.image || ''}
                    alt={partner.name}
                    width={300}
                    height={300}
                    className=" w-full md:w-72 rounded-md"
                  />
                ))}
              </div>
            </section>
            {user ? (
              typeModal === 'reservation' ? (
                <ReserveEventModal
                  open={showModal}
                  close={toggleModal}
                  event={event}
                  onClick={handleRequestReservation}
                  loading={reservationLoading}
                />
              ) : typeModal === 'error' ? (
                <ErrorModal
                  open={showModal}
                  close={toggleModal}
                  onClick={goToReservation}
                  message={errorMessage}
                />
              ) : (
                <SuccessfulReservationEventModal
                  open={showModal}
                  close={toggleModal}
                />
              )
            ) : (
              <AuthenticateModal open={showModal} close={toggleModal} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}
