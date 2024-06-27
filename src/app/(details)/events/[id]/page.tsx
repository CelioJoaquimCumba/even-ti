'use client'

import { Button } from "@/app/components/atoms/button";

import DataWaveBackground from "@/../assets/images/datawave-backgrond.png"
import DataWaveEvent from "@/../assets/images/datawave-event.png"
import MozDevzLogo from "@/../assets/images/mozdevz-logo.png"
import Profile from "@/../assets/images/profile.png"
import Image from "next/image";
import { Card, CardContent } from "@/app/components/atoms/card";
import { SpeakerCard } from "@/app/components/atoms/speaker-card";
import { useRouter } from "next/navigation";
import { Event } from "@/data/types";

const event: Event = {
    tickets: 10,
    id: "1",
    community: "MozDevz",
    location: "Maputo, Incubadora do ...",
    background: DataWaveBackground.src,
    logo: DataWaveEvent.src,
    title: "DataWave",
    date: "05 de Junho",
    time: "08:00 - 17:00",
    description: "Data Wave é uma conferência sobre Dados e ramo de Inteligência Artificial que irá contar com painéis, palestras e sessões práticas denominadas codelabs, de modo a garantir que os participantes possam ter uma contextualização sobre a relevância do campo de ciência de dados, entender conceitos básicos e poder criar os seus primeiros modelos.",
    objectives: ["Explorar oportunidades e desafios no ramo de ciência de dados no contexto local;","Dar a conhecer aos participantes sobre ciência de dados;","Explorar a criação de modelos e exploração de dados."  ],
    speakers: [
        {
            id: "1",
            name: "John Doe",
            image: Profile.src
        },
        {
            id: "2",
            name: "John Doe",
            image: Profile.src
        },
        {
            id: "3",
            name: "John Doe",
            image: Profile.src
        },
        {
            id: "4",
            name: "John Doe",
            image: Profile.src
        }
    ],
    organizers: [
        {
            id: "1",
            name: "MozDevz",
            image: MozDevzLogo.src
        }
    ],
    partners: [
        {
            id: "1",
            name: "MozDevz-partner",
            image: MozDevzLogo.src
        }
    ]
}
export default function EventPage() {
    const {title, description, background, logo, objectives, speakers, organizers, partners, tickets, location, date, time} = event
    const router = useRouter()
    const handleCommunity = (id: string) => {
        console.log('here')
        router.push(`/community/${id}`)
    }
    return (
        <div className="flex flex-col flex-grow self-stretch overflow-auto gap-4 md:gap-16">
            <section className={`flex flex-col self-stretch rounded-md justify-center items-center text-white text-center gap-4 bg-cover`} style={{ backgroundImage: `url(${background})` }} >
                <div className="flex flex-col flex-grow self-stretch rounded-md justify-center items-center gap-4 bg-black bg-opacity-50 py-24">
                    <h2 className="text-2xl md:text-5xl">{title}</h2>
                    <p className="md:text-2xl">Explorando o Potencial da Ciência de Dados e Inteligência Artificial</p>
                    <p className="md:text-xl">{date}, {time}</p>
                    <p className="md:text-xl">{location}</p>
                    <Button variant={"secondary"}>Reservar bilhete</Button>
                    <i>{tickets} bilhetes restantes</i>
                </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
                <h3 className="text-xl font-medium">O que é  {title}</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    <Image src={logo} alt={title} width={300} height={300} className=" w-full md:w-72 rounded-md" />
                    <p className="md:text-lg">
                        {description}
                    </p>
                </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
                <h3 className="text-xl font-medium">Objectivos do evento</h3>
                <div className="flex flex-col md:flex-row gap-2 ">
                    {objectives.map((objective, index) => (
                        <Card key={index} className="p-2 flex justify-center items-center">
                            <CardContent>
                            {objective}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
                <h3 className="text-xl font-medium">Speakers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                    {speakers.map((speaker, index) => (
                        <SpeakerCard className="w-full" key={index} speaker={{id: speaker.id,name: speaker.name, image: speaker.image}} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
                <h3 className="text-xl font-medium">{`Organizador${organizers.length > 1 ? 'es' : ''}`}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                    {organizers.map((organizer, index) => (
                        <div key={organizer.id} style={{ backgroundImage: `url(${organizer.image})` }} className=" w-full md:w-72 aspect-[4/3] bg-cover bg-center rounded-md">
                            <div className="flex w-full h-full justify-end items-end bg-black bg-opacity-10 p-4 ">
                                <Button variant={"secondary"} onClick={() => handleCommunity(organizer.id)}>Ver Comunidade</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-2 md:px-20">
                <h3 className="text-xl font-medium">{`Parceiro${partners.length > 1 ? 's' : ''}`}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
                    {partners.map((partner, index) => (
                        <Image key={partner.id} src={partner.image} alt={partner.name} width={300} height={300} className=" w-full md:w-72 rounded-md" />
                    ))}
                </div>
            </section>
        </div>
    );
}