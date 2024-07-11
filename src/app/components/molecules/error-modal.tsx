import { Button } from '../atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
export default function ErrorModal(props: {
  open: boolean
  close: () => void
  onClick: () => void
  message: string
}) {
  const { open, message, onClick, close } = props
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px] md:p-8 gap-8 md:gap-12">
        <DialogHeader className="flex flex-row flex-wrap items-center gap-2 md:gap-6">
          <span className="flex items-center justify-center  rounded-full w-12 h-12 bg-red-50 p-3">
            <Cross1Icon className="text-white h-full w-full fill-white bg-red-500 rounded-full p-1" />
          </span>
          <div className="flex flex-col justify-center">
            <DialogTitle className="flex gap-2 items-center">
              <h3 className="text-xl font-bold">Erro!</h3>
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2 md:gap-6 text-start">
              {message}
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-wrap gap-2">
          <Button variant={'outline'} onClick={close}>
            Cancelar
          </Button>
          <Button variant={'default'} onClick={onClick}>
            Tentar novamente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
