'use client'
import { usePage } from '@/app/providers/PageContext'
import { useEffect, useState } from 'react'
import SettingsProfileCard from '@/app/components/molecules/settings/settings-profile-card'
import { User } from '@/data/types'
import { getUserById } from '@/app/actions/user'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function SettingsPage() {
  const { setTitle } = usePage()
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()

  useEffect(() => {
    setTitle('Definições')
  }, [setTitle])

  useEffect(() => {
    ;(async function () {
      if (!user) return
      try {
        setLoading(true)
        const response = await getUserById(
          (user.sub && user.sub.toString().replace('auth0|', '')) || '',
        )
        if (!response) throw new Error('User not found')
        setUserData(response)
      } catch (err) {
        setError('Algo de errado não está certo')
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!userData) return <div>Algo de errado não está certo</div>

  return (
    <div className="flex w-full h-full flex-col gap-2 md:gap-6 bg-white rounded-2xl overflow-y-auto">
      <SettingsProfileCard user={userData} />
    </div>
  )
}
