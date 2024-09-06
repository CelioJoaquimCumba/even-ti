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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/app/firebaseConfig'
import { User } from '@/data/types'
import { sendEmail } from '@/app/actions/community'

export default function CreateCommunityModal(props: {
  open: boolean
  close: () => void
  user: User
  onSuccess: () => void
  onError: () => void
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
        handleSubmit()
      },
    }),
  )
  const { open, close, user, onError, onSuccess } = props
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [logo, setLogo] = useState<File | null>(null)
  const [background, setBackground] = useState<File | null>(null)
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
    setLogo(e.target.files![0])
    formik.values.logo = URL.createObjectURL(e.target.files![0])
    formik.validateField('logo')
  }
  const handleBackgroundSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBackground(e.target.files![0])
    formik.values.background = URL.createObjectURL(e.target.files![0])
    formik.validateField('background')
  }
  const deleteLogo = () => {
    setLogo(null)
    formik.values.logo = ''
  }
  const deleteBackground = () => {
    setBackground(null)
    formik.values.background = ''
  }
  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (!logo || !background)
        throw new Error('Logo and background are required')
      const logoUrl = await handleUpload(logo)
      const backgroundUrl = await handleUpload(background)
      await sendEmail(user, {
        name: formik.values.name,
        logo: logoUrl,
        background: backgroundUrl,
        description: formik.values.description,
        slogan: formik.values.slogan,
        site: formik.values.site,
      })
      onSuccess()
    } catch (error) {
      console.log(error)
      onError()
    } finally {
      setLoading(false)
    }
  }
  const handleUpload = async (file: File): Promise<string> => {
    if (!file) return ''

    const storageRef = ref(storage, `users/${user.id}/${file.name}`)

    try {
      await uploadBytes(storageRef, file)
      return await getDownloadURL(storageRef)
    } catch (error) {
      console.error('Error uploading the file', error)
    }
    return ''
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
              loading={loading}
            >
              {step === 1 ? 'Criar comunidade' : 'Proximo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
