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
  date: Date | undefined
  setDate: (date: Date) => void
}) {
  const { date, setDate } = props

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP', { locale: pt })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar lang="pt" mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}
