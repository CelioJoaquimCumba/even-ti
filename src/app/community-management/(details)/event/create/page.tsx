'use client'
import { Button } from '@/app/components/atoms/button'
import { DateInput } from '@/app/components/atoms/date-input'
import FileInput from '@/app/components/atoms/file-input'
import { Input } from '@/app/components/atoms/input'
import { Textarea } from '@/app/components/atoms/textarea'
import ObjectiveCardCreation from '@/app/components/molecules/event/objective-card-creation'
import { ChevronLeft, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function EventPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
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
        <form className="flex flex-col flex-grow max-w-lg ">
          <div className="flex flex-col gap-4 px-0.5 py-8 overflow-y-auto flex-grow max-w-lg">
            <h4 className="text-2xl font-medium">Criação de evento</h4>
            <FileInput
              label="Logotipo do evento"
              required
              onChange={() => {}}
              onDelete={() => {}}
            />
            <FileInput
              label="Imagem de fundo do evento"
              required
              onChange={() => {}}
              onDelete={() => {}}
            />
            <Input label="Nome do evento" />
            <Input label="Descricão do evento" />
            <Textarea label="Descricão do evento" />
            <Input label="Slogan do evento" />
            <Input
              label="Objectivos do evento"
              button
              buttonLabel="Adicionar"
              buttonOnClick={() => {
                console.log('clicked')
              }}
            />
            {[1, 2, 3].map((index) => (
              <ObjectiveCardCreation
                label="Objective"
                key={index}
                onDelete={() => {}}
              />
            ))}
            <DateInput date={date} setDate={setDate} />
            <Input label="Local do evento" />
            <Input label="Numero de ingressos" />
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
