'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function EventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    // Check if `id` is "create", if so redirect to the create page
    if (id === 'create') {
      router.push('/community-management/event/create')
    }
    console.log(id)
    if (id === 'edit') {
      router.push('/community-management/event/edit')
    }
  }, [id, router])
  return <div>Event</div>
}
