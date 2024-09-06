'use client'
import { usePage } from '@/app/providers/PageContext'
import { useEffect, useState } from 'react'
import SettingsProfileCard from '@/app/components/molecules/settings/settings-profile-card'
import { ModalType, User } from '@/data/types'
import { getUserById } from '@/app/actions/user'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from '@/app/components/atoms/button'
import { GitPullRequest } from 'lucide-react'
import CreateCommunityModal from '../components/molecules/settings/create-community-modal'
import ErrorModal from '../components/molecules/error-modal'
import SuccessfulCommunityRequestModal from '../components/molecules/settings/successful-community-request-modal'

export default function SettingsPage() {
  const { setTitle } = usePage()
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('error')

  const toggleCommunityModal = () => {
    setModalType('community-creation')
    setShowModal(!showModal)
  }
  const toggleModal = () => {
    setShowModal(!showModal)
  }

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
      <div className="bg-white p-8 flex flex-col gap-3 rounded-md border border-gray-200 w-fit">
        <h3 className="text-xl font-medium">Pretendes criar uma comunidade?</h3>
        <p>
          Pode faze-lo preenchendo a informação da sua comunidade e mandando o
          seu pedido.
        </p>
        <Button
          variant={'default'}
          className="w-fit gap-2"
          onClick={toggleCommunityModal}
        >
          <GitPullRequest className="w-5 h-5" />
          <span>Criar comunidade</span>
        </Button>
        {showModal &&
          (modalType === 'community-creation' ? (
            <CreateCommunityModal
              open={showModal}
              close={toggleCommunityModal}
              user={userData}
              onError={() => setModalType('error')}
              onSuccess={() => setModalType('success')}
            />
          ) : modalType === 'error' ? (
            <ErrorModal
              open={showModal}
              close={toggleModal}
              message="Algo de errado não está certo"
              onClick={toggleCommunityModal}
            />
          ) : (
            <SuccessfulCommunityRequestModal
              open={showModal}
              close={toggleModal}
            />
          ))}
      </div>
    </div>
  )
}
