import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDate(dateString: string , part?: 'day' | 'month') {
  // Parse the input date string
  const date = new Date(dateString)

  // Get the day and month
  const day = date.getUTCDate()
  const month = date.getUTCMonth() // Months are zero-based in JavaScript

  // Define an array of month names in Portuguese
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  const formattedDay = day.toString().padStart(2, '0')
  if (part === 'day') return formattedDay
  const formattedMonth = months[month]
  if (part === 'month') return formattedMonth
  // Format the date as "dd de Month"
  const formattedDate = `${formattedDay} de ${formattedMonth}`

  return formattedDate
}
