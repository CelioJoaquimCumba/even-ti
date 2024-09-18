'use client'
import { Button } from '@/app/components/atoms/button'
import { DateInput } from '@/app/components/atoms/date-input'
import FileInput from '@/app/components/atoms/file-input'
import { Input } from '@/app/components/atoms/input'
import { Textarea } from '@/app/components/atoms/textarea'
import ObjectiveCardCreation from '@/app/components/molecules/event/objective-card-creation'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/app/components/atoms/select'
import { ChevronLeft, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormik } from 'formik'
import { CreateEventValidation } from '@/app/formValidations/create-event'

export default function EventPage() {
  const router = useRouter()
  const formik = useFormik(
    CreateEventValidation({
      initialValues: {
        name: '',
        logo: '',
        background: '',
        description: '',
        slogan: '',
        date: undefined,
        location: '',
        max_tickets: 0,
        goals: [],
        speakers: [],
        sponsors: [],
      },
      onSubmit: () => {
        handleSubmit()
      },
    }),
  )
  const handleSubmit = () => {
    console.log('submitting')
  }

  const [logo, setLogo] = useState<File | null>(null)
  const [background, setBackground] = useState<File | null>(null)
  const [date, setDate] = useState<Date>()
  const [currentGoal, setCurrentGoal] = useState('')
  const [currentSpeaker, setCurrentSpeaker] = useState<{
    label: string
    id: string
  }>()
  const [currentSponsor, setCurrentSponsor] = useState<{
    label: string
    id: string
  }>()
  const handleCurrentGoal = () => {
    if (currentGoal) {
      addGoal(currentGoal)
      setCurrentGoal('')
    }
  }
  const [speakerOptions, setSpeakerOptions] = useState<
    { label: string; value: string }[]
  >([
    {
      label: 'Pessoal',
      value: '1',
    },
  ])
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
  // const handleUpload = async (file: File): Promise<string> => {
  //   if (!file) return ''

  //   const storageRef = ref(storage, `users/${user.id}/community/${file.name}`)

  //   try {
  //     await uploadBytes(storageRef, file)
  //     return await getDownloadURL(storageRef)
  //   } catch (error) {
  //     console.error('Error uploading the file', error)
  //   }
  //   return ''
  // }

  const addGoal = (goal: string) => {
    formik.values.goals = [...formik.values.goals, goal]
  }
  const removeGoal = (goal: string) => {
    formik.values.goals = formik.values.goals.filter((g) => g !== goal)
  }
  const addSpeaker = () => {
    if (!currentSpeaker) return
    formik.values.speakers = [...formik.values.speakers, currentSpeaker]
  }
  const removeSpeaker = (speaker: { id: string; label: string }) => {
    formik.values.speakers = formik.values.speakers.filter(
      (s) => s.id !== speaker.id,
    )
  }
  const addSponsor = () => {
    if (!currentSponsor) return
    formik.values.sponsors = [...formik.values.sponsors, currentSponsor]
  }
  const removeSponsor = (sponsor: { id: string; label: string }) => {
    formik.values.sponsors = formik.values.sponsors.filter(
      (s) => s.id !== sponsor.id,
    )
  }
  const [sponsorOptions, setSponsorOptions] = useState<
    { label: string; value: string }[]
  >([
    {
      label: 'Pessoal',
      value: '1',
    },
  ])
  const handleSponsor = (e: string) => {
    const sponsor = sponsorOptions.find((s) => s.value === e)
    const label = sponsor?.label
    const id = sponsor?.value
    if (!label || !id) return
    setCurrentSponsor({
      label,
      id,
    })
  }
  const handleSpeaker = (e: string) => {
    const speaker = speakerOptions.find((s) => s.value === e)
    const label = speaker?.label
    const id = speaker?.value
    if (!label || !id) return
    setCurrentSpeaker({
      label,
      id,
    })
  }
  return (
    <div className="flex flex-col pt-2 pb-8 px-6 bg-secondary overflow-hidden w-full h-full gap-2 md:gap-6">
      <header className="flex self-stretch justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            size={'icon'}
            className={`rounded-full md:flex`}
            onClick={() => router.back()}
          >
            <ChevronLeft />
          </Button>
        </div>
      </header>
      <main className="flex flex-grow justify-center overflow-hidden py-2 md:py-4 bg-white rounded-md">
        <form
          className="flex flex-col flex-grow max-w-lg"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-4 px-0.5 py-8 overflow-y-auto flex-grow max-w-lg">
            <h4 className="text-2xl font-medium">Criação de evento</h4>
            <Input
              label="Nome do evento"
              value={formik.values.name}
              required
              placeholder="Insira o nome da comunidade"
              onChange={formik.handleChange('name')}
              error={formik.errors.name}
            />
            <FileInput
              onChange={handleLogoSelection}
              onDelete={deleteLogo}
              label="Logotipo do evento"
              required
              preview={formik.values.logo}
              error={formik.errors.logo}
            />
            <FileInput
              onChange={handleBackgroundSelection}
              onDelete={deleteBackground}
              label="Imagem de fundo do evento"
              required
              preview={formik.values.background}
              error={formik.errors.background}
            />
            <Textarea
              label="Descricão do evento"
              required
              placeholder="Fale sobre a comunidade"
              value={formik.values.description}
              onChange={formik.handleChange('description')}
              error={formik.errors.description}
            />
            <Input
              label="Slogan do evento"
              placeholder="Insira o slogan da comunidade"
              value={formik.values.slogan}
              onChange={formik.handleChange('slogan')}
              error={formik.errors.slogan}
            />
            <Input
              label="Objectivos do evento"
              value={currentGoal}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setCurrentGoal(e.currentTarget.value)
              }
              button
              buttonLabel="Adicionar"
              buttonOnClick={handleCurrentGoal}
            />
            {formik.values.goals.map((goal) => (
              <ObjectiveCardCreation
                label={goal}
                key={goal}
                onDelete={() => removeGoal(goal)}
              />
            ))}
            <DateInput
              value={formik.values.date}
              onChange={formik.handleChange('date')}
              error={formik.errors.date}
            />
            <Input
              label="Local do evento"
              placeholder="Insira o local do evento"
              value={formik.values.location}
              onChange={formik.handleChange('location')}
              error={formik.errors.location}
            />
            <Input
              label="Numero de ingressos"
              type="number"
              placeholder="Insira a quantidade de bilhetes maxima"
              value={formik.values.max_tickets}
              onChange={formik.handleChange('max_tickets')}
              error={formik.errors.max_tickets}
            />

            <Select
              onValueChange={(e) => handleSpeaker(e)}
              defaultValue={currentSpeaker}
            >
              <p>Speakers do evento</p>
              <div className="flex gap-2">
                <SelectTrigger className={`flex space-x-2 `}>
                  <SelectValue placeholder={'Speakers'} />
                </SelectTrigger>
                <Button variant={'outline'} onClick={() => addSpeaker()}>
                  Adicionar
                </Button>
              </div>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{'Speakers'}</SelectLabel>
                  {speakerOptions
                    .filter((speaker) => {
                      return !formik.values.speakers.find(
                        (speakerr: { id: string }) =>
                          speakerr.id === speaker.value,
                      )
                    })
                    .map((speaker) => (
                      <SelectItem key={speaker.value} value={speaker.value}>
                        {speaker.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.values.speakers.map((speaker) => (
              <ObjectiveCardCreation
                label={speaker.label}
                key={speaker.id}
                onDelete={() => removeSpeaker(speaker)}
              />
            ))}

            <Select
              onValueChange={(e) => handleSponsor(e)}
              defaultValue={currentSponsor}
            >
              <p>Patrocinadores do evento</p>
              <div className="flex gap-2">
                <SelectTrigger className={`flex space-x-2 `}>
                  <SelectValue placeholder={'Sponsers'} />
                </SelectTrigger>
                <Button variant={'outline'} onClick={() => addSponsor()}>
                  Adicionar
                </Button>
              </div>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{'Sponsors'}</SelectLabel>
                  {sponsorOptions
                    .filter((sponsor) => {
                      return !formik.values.sponsors.find(
                        (sponsorr: { id: string }) =>
                          sponsorr.id === sponsor.value,
                      )
                    })
                    .map((sponsor) => (
                      <SelectItem key={sponsor.value} value={sponsor.value}>
                        {sponsor.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.values.sponsors.map((sponsor) => (
              <ObjectiveCardCreation
                label={sponsor.label}
                key={sponsor.id}
                onDelete={() => removeSponsor(sponsor)}
              />
            ))}
          </div>
          <div className="flex gap-2 w-full justify-center">
            <Button variant={'outline'}>Cancelar</Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Criar evento</span>
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
