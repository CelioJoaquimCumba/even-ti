import Image from "next/image"
import Profile from "@/../assets/images/profile.png"
import { Card, CardContent, CardHeader } from "./card"
import { Speaker } from "@/data/types"
export function SpeakerCard (props: {speaker: Speaker}) {
    const { name, image } = props.speaker

    return (
        <Card className="flex flex-col gap-2 px-2 py-4 bg-card-background justify-center items-center w-fit">
            <CardHeader className="p-0">
                <Image src={image} width={100} height={100} alt={`profile-${name}`} className="w-16 h-16 rounded-full" />
            </CardHeader>
            <CardContent className="p-0">
                <span>{name}</span>
            </CardContent>
        </Card>
    )
}