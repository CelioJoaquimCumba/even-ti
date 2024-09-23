'use client'

import { Button } from '@/app/components/atoms/button'

import { Card, CardContent } from '@/app/components/atoms/card'
import { SpeakerCard } from '@/app/components/atoms/speaker-card'
import { Event } from '@/data/types'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { convertDate } from '@/lib/utils'

export default function EventPreview(props: {
  event: Event | undefined
  loading: boolean
}) {
  const { event, loading } = props
  const router = useRouter()
  const handleCommunity = () => {
    alert('go to community')
  }
  const goToReservation = () => {
    alert('go to reservation')
  }
  return (
    <div className="flex flex-col gap-4 p-2 md:p-4 bg-white rounded-md">
      <div className="flex w-full justify-between">
        <h3 className="text-2xl text-gray-600 font-medium">
          Previsualização do evento
        </h3>
        {event && (
          <Button
            className="px-8 py-4 gap-2"
            onClick={() =>
              router.push(`/community-management/event/edit/${event.id}`)
            }
          >
            <Pencil className="w-4 h-4" />
            <span>Editar evento</span>
          </Button>
        )}
      </div>
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
                {convertDate(event.date.toDateString())}, {event.time}
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
                      onClick={() => handleCommunity()}
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
        </div>
      )}
    </div>
  )
}
