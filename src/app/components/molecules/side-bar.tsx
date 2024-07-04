'use client'

import ProfileNavItem from "../atoms/profile-nav-item";
import NavItem from "../atoms/nav-item";
import SideBarButton from "../atoms/sidebar-button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/data/routes";
import { getBreakpoint, isBreakpointLowOrEqual } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { Button } from "../atoms/button";

const navItems = [
    {
        label: 'Eventos',
        path: routes.events
    },
    {
        label: 'Comunidade',
        path: routes.community
    },
    {
        label: 'Reservas',
        path: routes.reservations
    }
]

export default function SideBar () {
    const [isOpen, setIsOpen] = useState(isBreakpointLowOrEqual('md') ? true : false)
    const toggleOpen = () => setIsOpen(!isOpen)
    const path = usePathname()
    const { user, error, isLoading } = useUser()
    return(
        <aside className={`flex ${isOpen ? "bg-background absolute w-full h-full" : 'static h-fit'}  md:relative md:w-fit flex-col px-6 py-4 md:py-8 space-y-16 z-20`}>
            <section className={`flex flex-col space-y-4`}>
                <div className="flex w-full justify-between">
                    <SideBarButton className={`md:absolute -right-4`} isOpen={isOpen} onClick={toggleOpen}/>
                    <div className={`bg-gray-200 w-24 h-10 rounded-lg ${!isOpen && "hidden"}`}></div>
                </div>
                <div className={`${!isOpen && "hidden"} flex flex-col items-center`}>
                    { user ? (
                        <>
                            <ProfileNavItem user={user} />
                            <a href="/api/auth/logout"><Button variant={'outline'} className="rounded-full"><ExitIcon /> Terminar Sessão</Button></a>
                        </>
                    ) :
                        <a href="/api/auth/login"><Button variant={'default'} className="rounded-full">Autenticar-se<EnterIcon /></Button></a>
                    }
                </div>
            </section>
            <ul className={`flex flex-col space-y-4 overflow-y-auto ${!isOpen && "hidden"}`}>
                { navItems.map((item) => <NavItem key={item.label} label={item.label} path={item.path} selected={path === item.path} />) }
            </ul>
        </aside>
    )
}