'use client'
import Image from "next/image";
import { usePage } from "@/app/providers/TitleContext";
import { useEffect, useState } from "react";
import { EventCard } from "@/app/components/molecules/event-card";
import { EventLite } from "@/data/types";
import dataWaveEvent from '@/../assets/images/datawave-event.png'
import profile from '/@/../assets/images/profile.png'
import { convertDate } from "@/lib/utils";
import { EventCardLoader } from "../components/molecules/event-card-loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<EventLite[]>()
  const {setTitle, search} = usePage()
  useEffect(() => {
    setTitle('Events')
  })
  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true)
        const events = await fetch(`/api/event`, {
          method: "GET"
        });
        const data = await events.json();
        const responseEvents : EventLite[] = data.map((event: any) => ({
          ...event,
          date: convertDate(event.date.toString()),
          speakers: event.speakers.map((speaker: any) => ({
            id: speaker.speaker.id,
            name: speaker.speaker.name,
            image: speaker.speaker.image
          }))
        }))
        setEvents(responseEvents)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])
  return (
    <main className="flex w-full h-full flex-col items-center gap-2 md:gap-6 bg-white rounded-2xl overflow-y-auto">
      {isLoading ? [1,2].map((_event, index) => <EventCardLoader key={index} />)  : !events ? 'Nao temos eventos para mostrar' : events.map((event: EventLite) => <EventCard key={event.id} event={event} />)}
    </main>
  );
}
