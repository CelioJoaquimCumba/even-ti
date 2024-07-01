export interface EventLite {
    id: string,
    community: string,
    title: string,
    logo: string,
    date: string,
    time: string,
    location: string,
    description: string,
    speakers: Speaker[],
    tickets?: number
}
export interface Event extends EventLite {
    tickets: number,
    background: string,
    objectives: string[],
    organizers: Organizer[],
    partners: Partner[]
}
export interface Organizer {
    id: string,
    name: string,
    image: string
}
export interface Partner {
    id: string,
    name: string,
    image: string
}
export interface Speaker {
    id: string,
    name: string,
    image: string
}
export interface CommunityLite {
    id: string,
    name: string,
    location: string,
    image: string,
    description: string
}


export interface PaginationMeta {
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}
