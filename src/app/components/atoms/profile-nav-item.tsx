'use client'

import Image from "next/image"
import Profile from "@/../assets/images/profile.png"
import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Button } from "./button"
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons"

export default function ProfileNavItem (props: {user: any}) {
    const [isOpen, setIsOpen] = useState(false)
    const user = props.user
    return (
        <div className={`flex flex-row px-8 py-4 items-center rounded-lg cursor-pointer ${isOpen ? "bg-secondary" : "bg-background"}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <div className="flex flex-row justify-center items-center space-x-2">
                <Image src={Profile} width={40} height={40} alt="profile" className="w-10 h-10 rounded-full" />
                <span className="text-lg text-black font-normal whitespace-nowrap ">{user?.name}</span>
            </div>
        </div>
    )

}