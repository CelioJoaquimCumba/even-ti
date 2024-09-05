import { Button } from '@/app/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/molecules/dialog'
import { useState } from 'react'
import { Input } from '@/app/components/atoms/input'
import { Textarea } from '@/app/components/atoms/textarea'
import FileInput from '@/app/components/atoms/file-input'
import { useFormik } from 'formik'
import { CreateCommunityValidation } from '@/app/formValidations/create-community'
export default function CreateCommunityModal(props: {
  open: boolean
  close: () => void
  onClick: () => void
}) {
  const formik = useFormik(
    CreateCommunityValidation({
      initialValues: {
        name: '',
        logo: '',
        background: '',
        description: '',
        slogan: '',
        site: '',
      },
      onSubmit: () => {
        onClick()
      },
    }),
  )
  const { open, onClick, close } = props
  const [step, setStep] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_logo, setLogo] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_background, setBackground] = useState('')
  const handleNext = () => {
    formik.validateField('name')
    formik.validateField('logo')
    formik.validateField('background')
    console.log(formik.errors)
    if (!formik.values.logo || !formik.values.background || !formik.values.name)
      return
    setStep(step + 1)
  }
  const handlePrevious = () => {
    setStep(step - 1)
  }
  const handleLogoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(URL.createObjectURL(e.target.files![0]))
    formik.values.logo = URL.createObjectURL(e.target.files![0])
    formik.validateField('logo')
  }
  const deleteLogo = () => {
    setLogo('')
    formik.values.logo = ''
  }
  const deleteBackground = () => {
    setBackground('')
    formik.values.background = ''
  }
  const handleBackgroundSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBackground(URL.createObjectURL(e.target.files![0]))
    formik.values.background = URL.createObjectURL(e.target.files![0])
    formik.validateField('background')
  }
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px] md:p-8 gap-8 md:gap-12">
        <DialogHeader className="flex flex-row flex-wrap items-center gap-2 md:gap-6">
          <DialogTitle className="flex gap-2 items-center text-xl font-bold">
            Formulário para pedido de criação de comunidade ({step + 1}/2)
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
          {step === 0 ? (
            <section className="flex flex-col">
              <Input
                label="Nome da comunidade"
                required
                placeholder="Insira o nome da comunidade"
                value={formik.values.name}
                onChange={formik.handleChange('name')}
                error={formik.errors.name}
              />
              <FileInput
                onChange={handleLogoSelection}
                onDelete={deleteLogo}
                label="Logotipo da comunidade"
                required
                preview={formik.values.logo}
                error={formik.errors.logo}
              />
              <FileInput
                onChange={handleBackgroundSelection}
                onDelete={deleteBackground}
                label="Imagem de fundo da comunidade"
                required
                preview={formik.values.background}
                error={formik.errors.background}
              />
            </section>
          ) : (
            <section className="flex flex-col">
              <Textarea
                label="Descrição da comunidade"
                required
                placeholder="Fale sobre a comunidade"
                value={formik.values.description}
                onChange={formik.handleChange('description')}
                error={formik.errors.description}
              />
              <Input
                label="Slogan da comunidade"
                placeholder="Insira o slogan da comunidade"
                value={formik.values.slogan}
                onChange={formik.handleChange('slogan')}
                error={formik.errors.slogan}
              />
              <Input
                label="Link do site da comunidade"
                placeholder="ex: http://localhost:3000"
                value={formik.values.site}
                onChange={formik.handleChange('site')}
                error={formik.errors.site}
              />
            </section>
          )}
          <DialogFooter className="flex flex-wrap gap-2">
            <Button
              variant={'outline'}
              onClick={step > 0 ? handlePrevious : close}
            >
              {step > 0 ? 'Voltar' : 'Cancelar'}
            </Button>
            <Button
              type={step === 1 ? 'submit' : 'button'}
              variant={'default'}
              onClick={step !== 1 ? handleNext : () => {}}
            >
              {step === 1 ? 'Criar comunidade' : 'Proximo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
