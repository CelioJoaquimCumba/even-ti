'use client'

import ProfileNavItem from '../atoms/profile-nav-item'
import NavItem from '../atoms/nav-item'
import SideBarButton from '../atoms/sidebar-button'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { routes } from '@/data/routes'
import { isBreakpointLowOrEqual } from '@/utils'
import { useUser } from '@auth0/nextjs-auth0/client'
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons'
import { Button } from '../atoms/button'
import { usePage } from '@/app/providers/PageContext'

const personalNavItems = [
  routes.events,
  routes.community,
  routes.reservations,
  routes.settings,
]

const communityNavItems = [
  routes.stats,
  routes.events,
  routes.members,
  routes.participants,
  routes.partners,
  routes.settings,
]

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  const path = usePathname()
  const { user } = useUser()
  const router = useRouter()
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    setIsOpen(isBreakpointLowOrEqual('md'))
  }, [refresh])
  const { space } = usePage()

  const navItems =
    space === 'personal' || !user ? personalNavItems : communityNavItems

  const handleNavigation = (path: string) => {
    router.push(path)
    setRefresh(!refresh)
  }
  return (
    <aside
      className={`flex ${isOpen ? 'bg-background absolute w-full h-full' : 'static h-fit'}  md:relative md:w-fit flex-col px-6 py-4 md:py-8 space-y-16 z-20`}
    >
      <section className={`flex flex-col space-y-4`}>
        <div className="flex w-full justify-between">
          <SideBarButton
            className={`md:absolute -right-4`}
            isOpen={isOpen}
            onClick={toggleOpen}
          />
          <div
            className={`bg-gray-200 w-24 h-10 rounded-lg ${!isOpen && 'hidden'}`}
          ></div>
        </div>
        <div className={`${!isOpen && 'hidden'} flex flex-col items-center`}>
          {user ? (
            <>
              <ProfileNavItem user={user} />
              <a href="/api/auth/logout">
                <Button variant={'outline'} className="rounded-full">
                  <ExitIcon /> Terminar Sessão
                </Button>
              </a>
            </>
          ) : (
            <a href="/api/auth/login">
              <Button variant={'default'} className="rounded-full">
                Autenticar-se
                <EnterIcon />
              </Button>
            </a>
          )}
        </div>
      </section>
      <ul
        className={`flex flex-col space-y-4 overflow-y-auto ${!isOpen && 'hidden'}`}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            onClick={() => handleNavigation(item.path)}
            selected={path === item.path}
            icon={item.icon}
          />
        ))}
      </ul>
    </aside>
  )
}
