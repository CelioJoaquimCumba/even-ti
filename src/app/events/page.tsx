'use client'
import { usePage } from '../providers/PageContext'

export default function Home() {
  const { setTitle } = usePage()
  setTitle('Events')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      event
    </main>
  )
}
