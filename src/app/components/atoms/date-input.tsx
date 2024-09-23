'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/app/components/atoms/button'
import { Calendar } from '@/app/components/atoms/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/atoms/popover'

export function DateInput(props: {
  value: Date | undefined
  onChange: (value: string) => void
  error?: string
}) {
  const { value, onChange, error } = props
  const handleSelect = (date: Date) => {
    onChange(date.toISOString())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, 'PPP', { locale: pt })
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
          <p className="text-red-500">{error}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          lang="pt"
          mode="single"
          selected={value}
          onSelect={(selectedDay) => selectedDay && handleSelect(selectedDay)}
        />
      </PopoverContent>
    </Popover>
  )
}
