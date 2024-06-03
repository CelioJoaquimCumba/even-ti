'use client'

import Link from "next/link"
import { useState } from "react"

interface NavItemProps {
    selected?: boolean,
    label: string,
    path: string
}
type state = 'selected' | 'hover' | 'default'
export default function NavItem ({selected = false, label='nav-item', path}: NavItemProps) {
    const [state, setState] = useState<state>(selected ? 'selected' : 'default')
    return (
        <Link href={path}>
            <li className={`flex  px-6 py-3 rounded-lg ${state === 'selected' || state === 'hover' ? "bg-secondary" : "bg-background"}`} onMouseEnter={() => state === 'default' && setState('hover')} onMouseLeave={() => state === 'hover' && setState('default')}>
                {label}
            </li>
        </Link>
    )
}