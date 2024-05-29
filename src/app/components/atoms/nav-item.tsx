'use client'

import { useState } from "react"

interface NavItemProps {
    selected?: boolean,
    label: string
}
type state = 'selected' | 'hover' | 'default'
export default function NavItem ({selected = false, label='nav-item'}: NavItemProps) {
    const [state, setState] = useState<state>(selected ? 'selected' : 'default')
    return (
        <li className={`flex  px-6 py-3 rounded-lg ${state === 'selected' || state === 'hover' ? "bg-gray-100" : "bg-white"}`} onMouseEnter={() => state === 'default' && setState('hover')} onMouseLeave={() => state === 'hover' && setState('default')}>
            {label}
        </li>
    )
}