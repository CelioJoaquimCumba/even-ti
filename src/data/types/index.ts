export interface Organizer {
  id: string
  name: string
  image: string
}
export interface Partner {
  id: string
  name: string
  image: string
}
export interface User {
  id: string
  name: string
  image: string
}

export interface EventLite {
  id: string
  community: string
  title: string
  logo: string
  date: string
  time: string
  location: string
  description: string
  speakers: User[]
  tickets?: number
}
export interface Event extends EventLite {
  tickets: number
  tagLine: string
  background: string
  objectives: string[]
  organizers: Organizer[]
  partners: Partner[]
}

export interface CommunityLite {
  id: string
  name: string
  location: string
  image: string
  description: string
}
export interface Community extends CommunityLite {
  url: string
  tagLine: string
  events: EventLite[]
  background: string
  members: User[]
  partners: Partner[]
}

export interface Reservation {
  id: string
  code: string
  event: EventLite
}

export interface PaginationMeta {
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}


export type ModalType = 'error' | 'success' | 'reservation'
