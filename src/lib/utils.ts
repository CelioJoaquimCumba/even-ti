import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDate(dateString: string) {
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

  // Format the date as "dd de Month"
  const formattedDate = `${day.toString().padStart(2, '0')} de ${months[month]}`

  return formattedDate
}
