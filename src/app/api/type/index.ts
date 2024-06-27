export interface Event {
    id: string,
    community: string,
    title: string,
    logo: string,
    date: string,
    time: string,
    location: string,
    description: string,
    tickets?: number,
    background: string,
    objectives: string[]
}
export interface EventOrganizer {
    id: string,
    eventId: string,
    organizerId: string
}
export interface EventPartner {
    id: string,
    eventId: string,
    partnerId: string
}
export interface EventSpeaker {
    id: string,
    eventId: string,
    speakerId: string
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

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}