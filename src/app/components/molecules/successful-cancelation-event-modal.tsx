import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog'
import { CheckIcon } from '@radix-ui/react-icons'
export default function SuccessfulCancelationEventModal(props: {
  open: boolean
  close: () => void
}) {
  const { open, close } = props
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px] md:p-8 gap-8 md:gap-12">
        <DialogHeader className="flex flex-row flex-wrap items-center gap-2 md:gap-6">
          <span className="flex items-center justify-center  rounded-full w-12 h-12 bg-green-50 p-3">
            <CheckIcon className="text-white h-full w-full fill-white bg-green-500 rounded-full p-1" />
          </span>
          <div className="flex flex-col justify-center">
            <DialogTitle className="flex gap-2 items-center">
              <h3 className="text-xl font-bold">
                A sua reserva foi cancelada com sucesso.
              </h3>
            </DialogTitle>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
