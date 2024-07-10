import { Button } from '../atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { EnterIcon } from '@radix-ui/react-icons'

export default function AuthenticateModal(props: {
  open: boolean
  close: () => void
}) {
  const { open } = props
  return (
    <Dialog open={open} onOpenChange={props.close}>
      <DialogContent className="sm:max-w-[425px] md:p-8">
        <DialogHeader className="flex flex-col md:gap-6">
          <DialogTitle>Não está autenticado</DialogTitle>
          <DialogDescription className="flex flex-col gap-2 md:gap-6">
            Por favor, realize o login para poder reservar o evento
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-wrap gap-2">
          <a href="/api/auth/login">
            <Button variant={'default'} className="rounded-full">
              Autenticar-se
              <EnterIcon />
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
