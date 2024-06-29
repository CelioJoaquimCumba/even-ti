'use client'

import Image from "next/image";
import { Card, CardContent, CardFooter } from "../atoms/card";
import { Badge } from "../atoms/badge";
import { SewingPinIcon } from '@radix-ui/react-icons'
import { Button } from "../atoms/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CommunityLite } from "@/data/types";

export function CommunityCard(props: { community: CommunityLite }) {
    const { id, name, image, location, description } = props.community
    const router = useRouter()
    return (
        <Card className={`flex flex-col h-fit space-y-2 md:flex-row w-full hover:bg-gray-50 justify-between p-4 rounded-2xl gap-2 cursor-pointer`} onClick={() => router.push(`/community/${id}`)}>
            <CardContent className="flex flex-wrap md:flex-nowrap gap-6 p-0 ">
                <Image unoptimized src={image} alt={`${name}-logo`} width={200} height={200} className={`flex flex-col w-full md:w-40 aspect-[4/3] md:aspect-square bg-cover justify-center items-center border rounded-3xl`}/>
                <article className="flex flex-col justify-between h-full gap-2">
                    <section className="flex flex-col space-y-2">
                        <h2 className="text-lg font-medium">{name}</h2>
                        <p className={`flex text-primary`}>
                            {description}
                        </p>
                        <ul className={`flex flex-col md:flex-col" gap-2`}>
                            <Badge variant={"secondary"} className="gap-2 px-2 py-1 w-fit">
                                <SewingPinIcon />
                                <span className="md:whitespace-nowrap">{location}</span>
                            </Badge>
                        </ul>
                    </section>
                    <Link href={`/community/${id}`} className={`w-full md:w-fit whitespace-pre-line md:flex`}>
                        <Button variant={'default'} className="w-full md:w-fit whitespace-pre-line px-8 py-4">Ver mais detalhes</Button>
                    </Link>
                </article>
            </CardContent>
        </Card>
    )
}