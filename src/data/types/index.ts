export interface Event {
    id: string,
    community: string,
    title: string,
    image: string,
    date: string,
    time: string,
    location: string,
    description: string,
    speakers: Speaker[],
    tickets?: number
}
export interface Speaker {
    id: string,
    name: string,
    image: string
}