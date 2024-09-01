'use client'
import { usePage } from '@/app/providers/PageContext'
import { useEffect, useState } from 'react'
import SettingsProfileCard from '../components/molecules/settings/settings-profile-card'
import { User } from '@/data/types'
import { getUserById } from '../actions/user'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function SettingsPage() {
  const { setTitle } = usePage()
  const [userData, setUserData] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useUser()
  useEffect(() => {
    setTitle('Definições')
  })
  useEffect(() => {
    ;(async function () {
      if (!user) return
      try {
        setLoading(true)
        const response = await getUserById(
          (user && user.sub && user.sub.toString().replace('auth0|', '')) || '',
        )
        if (!response) return
        setUserData(response)
      } finally {
        setLoading(false)
      }
    })()
  }, [user])
  if (loading) return <>Loading...</>
  if (!userData) return <>Algo de errado não está certo</>
  return (
    <div className="flex w-full h-full flex-col gap-2 md:gap-6 bg-white rounded-2xl overflow-y-auto">
      <SettingsProfileCard user={userData} />
    </div>
  )
}
