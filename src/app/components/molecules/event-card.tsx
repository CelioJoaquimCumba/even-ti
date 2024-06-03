import Image from "next/image";
import { Card, CardContent, CardFooter } from "../atoms/card";
import DataWaveEvent from "@/../assets/images/datawave-event.png"
import { Badge } from "../atoms/badge";
import { ClockIcon, SewingPinIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Button } from "../atoms/button";
import { ChevronDown } from "lucide-react";

export function EventCard() {
    return (
        <Card className="flex w-full justify-between p-4 rounded-2xl">
            <CardContent className="flex gap-6 p-0 ">
                <div className="flex flex-col w-40 aspect-square justify-center items-center border rounded-3xl">
                    <h2>Jun</h2>
                    <h3>5</h3>
                </div>
                <Image src={DataWaveEvent} alt="datawave-event" width={200} height={200} className="flex flex-col w-40 aspect-square justify-center items-center border rounded-3xl"/>
                <section className="flex flex-col space-y-2">
                    <h2 className="text-base font-normal">MozDevz</h2>
                        <h2 className="text-lg font-medium">DataWave</h2>
                    <ul className="flex flex-col space-y-2">
                        <Badge variant={"secondary"} className="gap-2 px-2 py-1 w-fit">
                            <CalendarIcon />
                            <span className="whitespace-nowrap">05 de Junho</span>
                        </Badge>
                        <Badge variant={"secondary"} className="gap-2 px-2 py-1 w-fit">
                            <ClockIcon />
                            <span className="whitespace-nowrap">08:00 - 17:00</span>
                        </Badge>
                        <Badge variant={"secondary"} className="gap-2 px-2 py-1 w-fit">
                            <SewingPinIcon />
                            <span className="whitespace-nowrap">Incubadora da Standard Bank</span>
                        </Badge>
                    </ul>
                </section>
            </CardContent>
            <CardFooter className="flex flex-col justify-between items-end p-0">
                <Button variant={"outline"} size={"icon"} className="rounded-full">
                    <ChevronDown/>
                </Button>
                <Button variant={'default'}>Reservar Bilhete</Button>
            </CardFooter>
        </Card>
    )
}