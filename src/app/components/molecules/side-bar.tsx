'use client'

import ProfileNavItem from '../atoms/profile-nav-item'
import NavItem from '../atoms/nav-item'
import SideBarButton from '../atoms/sidebar-button'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { routes } from '@/data/routes'
import { isBreakpointLowOrEqual } from '@/utils'
import { useUser } from '@auth0/nextjs-auth0/client'
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons'
import { Button } from '../atoms/button'
import { usePage } from '@/app/providers/PageContext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../atoms/select'
import { getMyCommunities } from '@/app/actions/community'
import { getUserById } from '@/app/actions/user'

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
  const [avatar, setAvatar] = useState<string | undefined | null>(user?.picture)
  useEffect(() => {
    ;(async () => {
      const userProfile = await getUserById(
        (user && user.sub && user.sub.toString().replace('auth0|', '')) || '',
      )
      if (user) {
        user.name = userProfile?.username
      }
      if (!userProfile || !userProfile.image) return
      setAvatar(userProfile.image)
    })()
  })
  const [refresh, setRefresh] = useState(false)
  const [spaceOptions, setSpaceOptions] = useState<
    { label: string; value: string }[]
  >([
    {
      label: 'Pessoal',
      value: '1',
    },
  ])

  useEffect(() => {
    ;(async () => {
      if (user) {
        const response = (await getMyCommunities(
          (user && user.sub && user.sub.toString().replace('auth0|', '')) || '',
        )) as { name: string; id: string }[]
        if (!response) return
        setSpaceOptions(
          spaceOptions.concat(
            response?.map((c) => ({ label: c.name, value: c.id })),
          ),
        )
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  useEffect(() => {
    setIsOpen(isBreakpointLowOrEqual('md'))
  }, [refresh])
  const { spaceType, setSpaceType, setSpace } = usePage()

  const navItems =
    spaceType === 'personal' || !user ? personalNavItems : communityNavItems

  const handleNavigation = () => {
    setRefresh(!refresh)
  }

  const handleSelectChange = (event: string) => {
    const value = event.toString()
    setSpaceType(value !== '1' ? 'community' : 'personal')
    const space = spaceOptions.find((s) => s.value === value)
    if (!space) return
    setSpace({ name: space.label, id: space.value })
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
          />
        </div>
        <div
          className={`${!isOpen && 'hidden'} flex flex-col gap-4 items-center`}
        >
          <Select onValueChange={(e) => handleSelectChange(e)} defaultValue="1">
            <SelectTrigger
              className={`flex space-x-2 ${spaceOptions.length <= 1 && 'hidden'}`}
            >
              <SelectValue placeholder={'Espaço'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{'Espaços'}</SelectLabel>
                {spaceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {user ? (
            <>
              <ProfileNavItem
                user={{
                  ...user,
                  picture: avatar,
                }}
              />
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
      <section
        className={`flex flex-col h-full justify-between ${!isOpen && 'hidden'}`}
      >
        <ul className={`flex flex-col space-y-4 overflow-y-auto`}>
          {navItems
            .filter((item) => !item.requiresAuth || user)
            .map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                onClick={() => handleNavigation()}
                selected={path === item.path}
                path={item.path}
                icon={item.icon}
              />
            ))}
        </ul>
        {user && (
          <a href="/api/auth/logout">
            <Button variant={'outline'} className="rounded-md">
              <ExitIcon /> Terminar Sessão
            </Button>
          </a>
        )}
      </section>
    </aside>
  )
}
