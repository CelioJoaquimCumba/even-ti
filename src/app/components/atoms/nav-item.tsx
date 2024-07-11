'use client'

import { useState } from 'react'

interface NavItemProps {
  selected?: boolean
  label: string
  onClick?: () => void
}
type state = 'selected' | 'hover' | 'default'
export default function NavItem({
  selected = false,
  label = 'nav-item',
  onClick,
}: NavItemProps) {
  const [state, setState] = useState<state>(selected ? 'selected' : 'default')
  return (
    <li
      onClick={onClick}
      className={`flex  px-6 py-3 rounded-lg ${selected || state === 'hover' ? 'bg-secondary' : 'bg-background'}`}
      onMouseEnter={() => state === 'default' && setState('hover')}
      onMouseLeave={() => state === 'hover' && setState('default')}
    >
      {label}
    </li>
  )
}
