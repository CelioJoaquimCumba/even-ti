import Image from "next/image";
import { Card, CardContent, CardFooter } from "../atoms/card";
import DataWaveEvent from "@/../assets/images/datawave-event.png"
import { Badge } from "../atoms/badge";
import { ClockIcon, SewingPinIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Button } from "../atoms/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { SpeakerCard } from "../atoms/speaker-card";
import { Event } from "@/data/types";
import Link from "next/link";

export function EventCard(props: { event: Event }) {
    const { community, title, image, date, time, location, description, speakers, tickets } = props.event
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Card className={`flex flex-col space-y-2 ${!isOpen && "md:flex-row"} w-full justify-between p-4 rounded-2xl gap-2`}>
            <CardContent className="flex gap-6 p-0 ">
                <div className={`hidden ${!isOpen && "md:flex md:flex-col"} w-64 aspect-square justify-center items-center border rounded-3xl`}>
                    <h2>{date.split('de')[1]}</h2>
                    <h3>{date.split('de')[0]}</h3>
                </div>
                <Image src={image} alt="datawave-event" width={200} height={200} className={`flex flex-col ${isOpen ? "w-80 aspect-[3/4]" : "w-40 aspect-square"} justify-center items-center border rounded-3xl`}/>
                <section className="flex flex-col space-y-2 w-full">
                    <div className="flex justify-between w-full">
                        <h2 className="text-base font-normal">{community}</h2>
                        <Button variant={"outline"} size={"icon"} className={`rounded-full hidden md:flex ${!isOpen && "md:hidden"}`} onClick={() => setIsOpen(!isOpen)}>
                            <ChevronUp/>
                        </Button>
                    </div>
                        <h2 className="text-lg font-medium">{title}</h2>
                    <ul className={`flex flex-col ${isOpen ? "md:flex-row md:flex-wrap" : "md:flex-col"} gap-2`}>
                        <Badge variant={"secondary"} className={`gap-2 px-2 py-1 w-fit ${!isOpen && "md:hidden"}`}>
                            <CalendarIcon />
                            <span className="md:whitespace-nowrap">{date}</span>
                        </Badge>
                        <Badge variant={"secondary"} className="gap-2 px-2 py-1 w-fit">
                            <ClockIcon />
                            <span className="md:whitespace-nowrap">{time}</span>
                        </Badge>
                        <Badge variant={"secondary"} className="gap-2 px-2 py-1 w-fit">
                            <SewingPinIcon />
                            <span className="md:whitespace-nowrap">{location}</span>
                        </Badge>
                    </ul>
                    <p className={`${isOpen && "md:block"} hidden text-primary`}>
                        {description}
                    </p>
                    <section className={`hidden flex-col ${isOpen  && "md:flex"}`}>
                        <h3>Speakers:</h3>
                        <div className="flex gap-2 flex-wrap">
                            {speakers.map((speaker) => <SpeakerCard key={speaker.id} speaker={speaker}/> )}
                        </div>
                    </section>
                </section>
            </CardContent>
            <CardFooter className={`flex flex-col justify-between items-end p-0`}>
                <Button variant={"outline"} size={"icon"} className={`rounded-full hidden md:flex ${isOpen && "md:hidden"}`} onClick={() => setIsOpen(!isOpen)}>
                    <ChevronDown/>
                </Button>
                <div className="flex gap-2 w-full">
                    <Link href={`/event/${props.event.id}`} className={`w-full md:w-fit whitespace-pre-line hidden ${isOpen && "md:flex"}`}>
                        <Button variant={'outline'} className="w-full md:w-fit whitespace-pre-line">Ver mais detalhes</Button>
                    </Link>
                    <Button variant={'default'} className="w-full md:w-fit whitespace-pre-line">Reservar Bilhete {tickets && `(${tickets} disponiveis)`}</Button>
                </div>
            </CardFooter>
        </Card>
    )
}