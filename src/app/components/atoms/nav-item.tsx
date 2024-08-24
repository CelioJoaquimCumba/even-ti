'use client'

import { useState } from 'react'
import { LucideProps } from 'lucide-react'

interface NavItemProps {
  selected?: boolean
  label: string
  onClick?: () => void
  icon?: React.FC<LucideProps>
}
type state = 'selected' | 'hover' | 'default'
export default function NavItem({
  selected = false,
  label = 'nav-item',
  onClick,
  icon,
}: NavItemProps) {
  const [state, setState] = useState<state>(selected ? 'selected' : 'default')
  return (
    <li
      onClick={onClick}
      className={`flex items-center px-6 py-3 rounded-lg cursor-pointer gap-3 ${selected || state === 'hover' ? 'bg-secondary' : 'bg-background'}`}
      onMouseEnter={() => state === 'default' && setState('hover')}
      onMouseLeave={() => state === 'hover' && setState('default')}
    >
      {icon && <Icon icon={icon} />}
      {label}
    </li>
  )
}

function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
  return <Icon className="size-4 text-gray-700" />
}
