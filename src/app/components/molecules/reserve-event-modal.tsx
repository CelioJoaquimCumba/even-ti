import { EventLite } from '@/data/types'
import { Button } from '../atoms/button'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
export default function ReserveEventModal(props: {
  open: boolean
  close: () => void
  onClick: () => void
  event: EventLite
  loading: boolean
}) {
  const { open, event } = props
  const { title, description, logo, date, time } = event
  return (
    <Dialog open={open} onOpenChange={props.close}>
      <DialogContent className="sm:max-w-[425px] md:p-8">
        <DialogHeader className="flex flex-col md:gap-6">
          <DialogTitle>Deseja participar do evento {title}?</DialogTitle>
          <DialogDescription className="flex flex-col gap-2 md:gap-6">
            <Image
              unoptimized
              src={logo}
              alt="datawave-event"
              width={200}
              height={200}
              className={`flex flex-col max-w-md md:w-full aspect-[4/3] bg-cover justify-center items-center border rounded-3xl`}
            />
            <p className="text-base font-normal text-slate-700">
              {description}
            </p>
            <p className="text-base font-normal text-slate-700">{date}</p>
            <p className="text-base font-normal text-slate-700">{time}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-wrap gap-2">
          <Button variant={'outline'} onClick={props.close}>
            Cancelar
          </Button>
          <Button
            variant={'default'}
            onClick={props.onClick}
            loading={props.loading}
          >
            Reservar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
