'use client'

import Image from 'next/image'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProfileNavItem(props: { user: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const user = props.user
  return (
    <div
      className={`flex flex-row px-8 py-4 items-center rounded-lg cursor-pointer ${isOpen ? 'bg-secondary' : 'bg-background'}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-row justify-center items-center space-x-2">
        <Image
          unoptimized
          src={
            user.picture ||
            `https://ui-avatars.com/api/?name=${user.name}&&background=random`
          }
          width={40}
          height={40}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-lg text-black font-normal whitespace-nowrap ">
          {user?.name}
        </span>
      </div>
    </div>
  )
}
