import { Button } from '@/app/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/molecules/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Input } from '@/app/components/atoms/input'
import { Textarea } from '@/app/components/atoms/textarea'
export default function CreateCommunityModal(props: {
  open: boolean
  close: () => void
  onClick: () => void
}) {
  const { open, onClick, close } = props
  const [step, setStep] = useState(0)
  const handleNext = () => {
    setStep(step + 1)
  }
  const handlePrevious = () => {
    setStep(step - 1)
  }
  const handleSubmit = () => {
    onClick()
  }
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px] md:p-8 gap-8 md:gap-12">
        <DialogHeader className="flex flex-row flex-wrap items-center gap-2 md:gap-6">
          <DialogTitle className="flex gap-2 items-center">
            <h3 className="text-xl font-bold">
              Formulário para pedido de criação de comunidade ({step + 1}/2)
            </h3>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form className="flex flex-col gap-6">
            {step === 0 ? (
              <section className="flex flex-col">
                <Input
                  label="Nome da comunidade"
                  required
                  placeholder="Insira o nome da comunidade"
                />
                <span>file input</span>
                <span>another file input</span>
              </section>
            ) : (
              <section className="flex flex-col">
                <Textarea
                  label="Descrição da comunidade"
                  required
                  placeholder="Fale sobre a comunidade"
                />
                <Input
                  label="Slogan da comunidade"
                  placeholder="Insira o slogan da comunidade"
                />
                <Input
                  label="Link do site da comunidade"
                  placeholder="ex: http://localhost:3000"
                />
              </section>
            )}
          </form>
        </DialogDescription>
        <DialogFooter className="flex flex-wrap gap-2">
          <Button
            variant={'outline'}
            onClick={step > 0 ? handlePrevious : close}
          >
            {step > 0 ? 'Voltar' : 'Cancelar'}
          </Button>
          <Button
            variant={'default'}
            onClick={step === 1 ? handleSubmit : handleNext}
          >
            {step === 1 ? 'Criar comunidade' : 'Proximo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
