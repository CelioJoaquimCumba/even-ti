import { Button } from '../atoms/button'
import { EventLite } from '@/data/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
export default function EventCancelationModal(props: {
  open: boolean
  close: () => void
  onClick: () => void
  event: EventLite
  loading: boolean
}) {
  const { open, onClick, close, event, loading } = props
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px] md:p-8 gap-8 md:gap-12">
        <DialogHeader className="flex flex-row flex-wrap items-center gap-2 md:gap-6">
          <span className="flex items-center justify-center  rounded-full w-12 h-12 bg-red-50 p-3">
            <ExclamationTriangleIcon className="text-white h-full w-full fill-white bg-red-500 rounded-full p-1" />
          </span>
          <div className="flex flex-col justify-center">
            <DialogTitle className="flex gap-2 items-center">
              <h3 className="text-xl font-bold">
                Pretendes cancelar a reserva para {event.title}?
              </h3>
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2 md:gap-6 text-start">
              Se as vagas se esgotarem, você não poderá participar do evento.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-wrap gap-2">
          <Button variant={'outline'} onClick={close}>
            Não
          </Button>
          <Button loading={loading} variant={'destructive'} onClick={onClick}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
