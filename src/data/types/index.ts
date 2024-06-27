import { SeparatorConfig } from "tailwindcss/types/config"

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
    speakers: Speaker[],
    organizers: Organizers[],
    partners: Partners[]
}
interface Organizers {
    id: string,
    name: string,
    image: string
}
interface Partners {
    id: string,
    name: string,
    image: string
}
export interface Speaker {
    id: string,
    name: string,
    image: string
}