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
  const { user } = useUser()
  useEffect(() => {
    setTitle('Definições')
  })
  useEffect(() => {
    ;(async function () {
      if (!user) return
      const response = await getUserById(
        (user && user.sub && user.sub.toString().replace('auth0|', '')) || '',
      )
      if (!response) return
      setUserData(response)
    })()
  }, [user])
  return (
    <div className="flex w-full h-full flex-col gap-2 md:gap-6 bg-white rounded-2xl overflow-y-auto">
      {userData && <SettingsProfileCard user={userData} />}
    </div>
  )
}
