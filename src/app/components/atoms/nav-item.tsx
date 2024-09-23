'use client'

import { useState } from 'react'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'

interface NavItemProps {
  selected?: boolean
  label: string
  path: string
  onClick?: () => void
  icon?: React.FC<LucideProps>
  comingSoon?: boolean
}
type state = 'selected' | 'hover' | 'default'
export default function NavItem({
  selected = false,
  label = 'nav-item',
  path = '/',
  onClick,
  icon,
  comingSoon = false,
}: NavItemProps) {
  const [state, setState] = useState<state>(selected ? 'selected' : 'default')
  if (comingSoon) {
    return (
      <div className="flex justify-between items-center px-6 py-3 rounded-lg cursor-pointer gap-3 bg-muted">
        <div className="flex gap-3">
          {icon && <Icon icon={icon} />}
          {label}
        </div>
        <span className="bg-orange-500 text-white p-1 rounded-md text-xs text-center truncate whitespace-nowrap overflow-ellipsis">
          Coming soon
        </span>
      </div>
    )
  }
  return (
    <Link
      href={path}
      onClick={onClick}
      className={`flex items-center px-6 py-3 rounded-lg cursor-pointer gap-3 ${selected || state === 'hover' ? 'bg-secondary' : 'bg-background'}`}
      onMouseEnter={() => state === 'default' && setState('hover')}
      onMouseLeave={() => state === 'hover' && setState('default')}
    >
      {icon && <Icon icon={icon} />}
      {label}
    </Link>
  )
}

function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
  return <Icon className="size-4 text-gray-700" />
}
