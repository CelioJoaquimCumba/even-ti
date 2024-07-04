'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter } from '../atoms/card'
import { Badge } from '../atoms/badge'
import { ClockIcon, SewingPinIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '../atoms/button'
import { useState } from 'react'
import { EventLite } from '@/data/types'
import { useRouter } from 'next/navigation'

export function EventCardLite(props: { event: EventLite }) {
  const {
    id,
    community,
    title,
    logo: image,
    date,
    time,
    location,
    description,
    tickets,
  } = props.event
  const [isOpen] = useState(false)
  const router = useRouter()
  return (
    <Card
      className={`flex flex-col space-y-2 ${!isOpen && 'md:flex-row'} w-full hover:bg-gray-50 justify-between p-4 rounded-2xl gap-2 cursor-pointer`}
      onClick={() => router.push(`/events/${id}`)}
    >
      <CardContent className="flex flex-wrap md:flex-nowrap gap-6 p-0 ">
        <div
          className={`hidden ${!isOpen && 'md:flex md:flex-col'} w-40 h-40 justify-center items-center border rounded-3xl`}
        >
          <h2>{date.split('de')[1]}</h2>
          <h3>{date.split('de')[0]}</h3>
        </div>
        <Image
          unoptimized
          src={image}
          alt="datawave-event"
          width={200}
          height={200}
          className={`flex flex-col ${isOpen ? 'w-80 aspect-[3/4]' : 'w-40 h-40 aspect-square bg-cover'} justify-center items-center border rounded-3xl`}
        />
        <section className="flex flex-col space-y-2">
          <div className="flex justify-between w-full">
            <h2 className="text-base font-normal">{community}</h2>
          </div>
          <h2 className="text-lg font-medium">{title}</h2>
          <ul
            className={`flex flex-col ${isOpen ? 'md:flex-row md:flex-wrap' : 'md:flex-col'} gap-2`}
          >
            <Badge
              variant={'secondary'}
              className={`gap-2 px-2 py-1 w-fit ${!isOpen && 'md:hidden'}`}
            >
              <CalendarIcon />
              <span className="md:whitespace-nowrap">{date}</span>
            </Badge>
            <Badge variant={'secondary'} className="gap-2 px-2 py-1 w-fit">
              <ClockIcon />
              <span className="md:whitespace-nowrap">{time}</span>
            </Badge>
            <Badge variant={'secondary'} className="gap-2 px-2 py-1 w-fit">
              <SewingPinIcon />
              <span className="md:whitespace-nowrap">{location}</span>
            </Badge>
          </ul>
          <p className={`${isOpen && 'md:block'} hidden text-primary`}>
            {description}
          </p>
        </section>
      </CardContent>
      <CardFooter className={`flex flex-col justify-between items-end p-0`}>
        <div className="flex gap-2 w-full">
          <Button
            variant={'default'}
            className="w-full md:w-fit whitespace-pre-line px-8 py-4"
          >
            Reservar Bilhete {tickets && `(${tickets} disponiveis)`}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
