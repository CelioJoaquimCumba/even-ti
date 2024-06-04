'use client'
import Image from "next/image";
import { useTitle } from "../providers/TitleContext";
import { useEffect } from "react";
import { EventCard } from "../components/molecules/event-card";
import { Event } from "@/data/types";
import dataWaveEvent from '@/../assets/images/datawave-event.png'
import profile from '/@/../assets/images/profile.png'

const events: Array<Event> = [
  {
    id: '1',
    community: "MozDevz",
    title: "DataWave",
    image: dataWaveEvent.src,
    date: "05 de Junho",
    time: "08:00 - 17:00",
    location: "São Paulo, SP",
    tickets: 10,
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem pariatur quia, dignissimos porro magni dolorum velit earum tenetur alias voluptatem, eligendi eos illum rerum facilis eaque fuga! Libero, qui consectetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero sunt laborum architecto dolorem quas magni culpa est, nemo magnam tempore, delectus nostrum odit vel dignissimos recusandae voluptatem, vitae dolore quaerat.",
    speakers: [
      {
        id: '1',
        name: "Celio Cumba",
        image: profile.src
      },
      {
        id: '2',
        name: "Name Surname",
        image: profile.src
      }
    ]
  }
]

export default function Home() {
  const {setTitle} = useTitle()
  useEffect(() => {
    setTitle('Events')
  })
  return (
    <main className="flex w-full h-full flex-col items-center justify-between">
      {events.map((event: Event) => <EventCard key={event.title} event={event} />)}
    </main>
  );
}
