import { Trash } from 'lucide-react'
import { Button } from '../../atoms/button'

export default function ObjectiveCardCreation(props: {
  label: string
  onDelete: () => void
}) {
  const { label, onDelete } = props
  return (
    <div className="flex justify-between gap-2 w-full p-2 rounded-2xl border border-secondary items-center">
      <span>{label}</span>
      <Button className="rounded-full" variant={'outline'} onClick={onDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  )
}
