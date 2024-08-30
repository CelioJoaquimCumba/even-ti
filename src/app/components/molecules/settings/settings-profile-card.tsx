import { Button } from '@/app/components/atoms/button'
import SettingsProfilePicture from '@/app/components/molecules/settings/settings-profile-picture'
import { Pencil } from 'lucide-react'
import { User } from '@/data/types'
import { useState } from 'react'

export type Mode = 'view' | 'edit'
export default function SettingsProfileCard(props: { user: User }) {
  const { user } = props
  const [mode, setMode] = useState<Mode>('view')
  const handleEdit = () => {
    setMode('edit')
  }
  console.log(user)
  return (
    <article className="flex flex-col gap-3 p-8 rounded-md md:gap-6 border border-gray-200">
      <header>
        <h2 className="text-lg font-medium text-black">Perfil {mode}</h2>
      </header>
      <section className="flex flex-col md:flex-row gap-16">
        <SettingsProfilePicture user={user} />
        <div className="flex items-end flex-col-reverse gap-3 md:flex-row md:gap-8 md:items-start w-full">
          <div className="flex flex-col md:flex-row gap-3 md:gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h3 className="text-lg font-light text-gray-600">Username</h3>
                <p className="text-lg text-black">{user?.username}</p>
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-600">
                  Nome completo
                </h3>
                <p className="text-lg text-black">{user?.name}</p>
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-600">Telefone</h3>
                <p className="text-lg text-black">{user?.phone}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h3 className="text-lg font-light text-gray-600">Género</h3>
                <p className="text-lg text-black">{user?.gender}</p>
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-600">Profissão</h3>
                <p className="text-lg text-black">{user?.profession}</p>
              </div>
            </div>
          </div>
          <Button
            variant={'outline'}
            className="rounded-full aspect-square p-4 size-16"
            onClick={handleEdit}
          >
            <Pencil strokeWidth={1} />
          </Button>
        </div>
      </section>
      <section>
        <h3 className="text-lg font-light text-gray-600">Bio</h3>
        <p className="text-lg">{user?.bio}</p>
      </section>
    </article>
  )
}
