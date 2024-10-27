'use client'

import { Button } from '@/app/components/atoms/button'
import Image from 'next/image'
import { SpeakerCard } from '@/app/components/atoms/speaker-card'
import { useRouter } from 'next/navigation'
import { Community } from '@/data/types'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EventCardLite } from '@/app/components/molecules/event/event-card-lite'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { getCommunityById } from '@/app/actions/community'

export default function CommunityPage({ params }: { params: { id: string } }) {
  const [community, setCommunity] = useState<Community>()
  const router = useRouter()
  const { id } = params
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        const response = await getCommunityById(id)
        if (!response || !response == null) {
          throw new Error('Community not found')
        }
        setCommunity(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])
  return (
    <div className="flex flex-col pt-2 pb-8 px-6 bg-secondary overflow-hidden w-full h-full gap-2 md:gap-6">
      {!loading && community && (
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
            <h1 className="text-lg md:text-2xl text-gray-700">
              {community.name}
            </h1>
          </div>
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
        ) : !community ? (
          'Algo de errado não está certo.'
        ) : (
          <div className="flex flex-col flex-grow self-stretch overflow-auto gap-4 md:gap-16">
            <section
              className={`flex flex-col self-stretch rounded-md justify-center items-center text-white text-center gap-4 bg-cover`}
              style={{ backgroundImage: `url(${community.background})` }}
            >
              <div className="flex flex-col flex-grow self-stretch rounded-md justify-center items-center gap-4 bg-black bg-opacity-50 py-36">
                <h2 className="text-2xl md:text-5xl">{community.name}</h2>
                <p className="md:text-2xl">{community.tagLine}</p>
                {community.url && (
                  <Button
                    className="gap-2"
                    variant={'default'}
                    onClick={() => window.open(community.url, '_blank')}
                  >
                    <ExternalLinkIcon />
                    visite-nos
                  </Button>
                )}
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">O que é {community.name}</h3>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <Image
                  unoptimized
                  src={community.image}
                  alt={community.name}
                  width={300}
                  height={300}
                  className=" w-full md:w-72 rounded-md"
                />
                <p className="md:text-lg">{community.description}</p>
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">Eventos</h3>
              <div className="grid grid-cols-1 gap-2 w-full ">
                {community.events.map((event, index) => (
                  <EventCardLite key={index} event={event} />
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">Membros</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                {community.members.map((member, index) => (
                  <SpeakerCard
                    className="w-full"
                    key={index}
                    speaker={{
                      id: member.id,
                      name: member.name,
                      image: member.image,
                    }}
                  />
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
              <h3 className="text-xl font-medium">{`Parceiro${community.partners.length > 1 ? 's' : ''}`}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                {community.partners.map((partner) => (
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
      </main>
    </div>
  )
}
