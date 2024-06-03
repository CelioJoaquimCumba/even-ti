'use client'
import Image from "next/image";
import { useTitle } from "../providers/TitleContext";
import { useEffect } from "react";

export default function Home() {
  const {setTitle} = useTitle()
  useEffect(() => {
    setTitle('Events')
  })
  return (
    <main className="flex h-full flex-col items-center justify-between">
      event
    </main>
  );
}
