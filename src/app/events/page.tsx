'use client'
import Image from "next/image";
import { useTitle } from "../providers/TitleContext";
import { useEffect } from "react";
import { EventCard } from "../components/molecules/event-card";

export default function Home() {
  const {setTitle} = useTitle()
  useEffect(() => {
    setTitle('Events')
  })
  return (
    <main className="flex w-full h-full flex-col items-center justify-between">
      <EventCard/>
    </main>
  );
}
