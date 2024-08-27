import { User } from '@/data/types'
import { Button } from '../../atoms/button'
import { Pencil } from 'lucide-react'

export default function SettingsProflePicture(props: { user: User }) {
  const { user } = props
  const toggleModal = () => {
    console.log('TODO')
  }
  return (
    <div
      className="flex flex-shrink-0 size-32 md:size-48 rounded-full aspect-square bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: `url(${user?.image})` }}
    >
      <span className="flex items-center justify-center flex-shrink-0 w-full h-full rounded-full px-5 py-1 opacity-0 hover:opacity-100 hover:bg-opacity-20 hover:bg-black  ">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={toggleModal}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </span>
    </div>
  )
}
