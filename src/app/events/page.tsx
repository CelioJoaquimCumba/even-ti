'use client'
import Image from "next/image";
import { useTitle } from "../providers/TitleContext";

export default function Home() {
  const {setTitle} = useTitle()
  setTitle('Events')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      event
    </main>
  );
}
