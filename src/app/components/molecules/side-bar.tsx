'use client'

import ProfileNavItem from "../atoms/profile-nav-item";
import NavItem from "../atoms/nav-item";
import SideBarButton from "../atoms/sidebar-button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/data/routes";
import { getBreakpoint, isBreakpointLowOrEqual } from "@/utils";

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
    return(
        <aside className={`flex ${isOpen ? "bg-background absolute w-full h-full" : 'static h-fit'}  md:relative md:w-fit flex-col px-6 py-4 md:py-8 space-y-16 z-20`}>
            <section className={`flex flex-col space-y-4`}>
                <div className="flex w-full justify-between">
                    <SideBarButton className={`md:absolute -right-4`} isOpen={isOpen} onClick={toggleOpen}/>
                    <div className={`bg-gray-200 w-24 h-10 rounded-lg ${!isOpen && "hidden"}`}></div>
                </div>
                <div className={`${!isOpen && "hidden"}`}>
                    <ProfileNavItem />
                </div>
            </section>
            <ul className={`flex flex-col space-y-4 overflow-y-auto ${!isOpen && "hidden"}`}>
                { navItems.map((item) => <NavItem key={item.label} label={item.label} path={item.path} selected={path === item.path} />) }
            </ul>
        </aside>
    )
}