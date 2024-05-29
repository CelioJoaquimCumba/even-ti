'use client'

import Image from "next/image"
import Profile from "@/../assets/images/profile.png"
import { useState } from "react"

export default function ProfileNavItem () {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`flex flex-row px-8 py-4 justify-between w-96 rounded-lg cursor-pointer ${isOpen ? "bg-gray-100" : "bg-white"}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <div className="flex flex-row justify-center items-center space-x-2">
                <Image src={Profile} width={40} height={40} alt="profile" className="w-10 h-10 rounded-full" />
                <span className="text-lg text-black font-normal ">Celio Cumba</span>
            </div>
        </div>
    )

}