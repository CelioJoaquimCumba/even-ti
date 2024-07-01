import Image from "next/image"
import Profile from "@/../assets/images/profile.png"
import { Card, CardContent, CardHeader } from "./card"
import { User } from "@/data/types"
import { cn } from "@/lib/utils"
export function SpeakerCard (props: {speaker: User, className?: string}) {
    const { name, image } = props.speaker

    return (
        <Card className={cn(
            "flex flex-col gap-2 px-2 py-4 bg-card-background justify-center items-center w-fit",
            props.className
        )} >
            <CardHeader className="p-0">
                <Image unoptimized src={image} width={100} height={100} alt={`profile-${name}`} className="w-16 h-16 rounded-full bg-cover" />
            </CardHeader>
            <CardContent className="p-0">
                <span>{name}</span>
            </CardContent>
        </Card>
    )
}