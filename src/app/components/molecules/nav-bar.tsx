'use client'

import ProfileNavItem from "../atoms/profile-nav-item";
import NavItem from "../atoms/nav-item";
import SideBarButton from "../atoms/sidebar-button";
import { useState } from "react";

export default function NavBar () {
    const [isOpen, setIsOpen] = useState(true)
    const toggleOpen = () => setIsOpen(!isOpen)
    return(
        <nav className="flex relative flex-col px-6 py-8 space-y-16">
            <SideBarButton className="absolute -right-4 " isOpen={isOpen} onClick={toggleOpen}/>
            <section className={`flex flex-col space-y-4 ${!isOpen && "hidden"}`}>
                <div className="bg-gray-200 w-24 h-10 rounded-lg"></div>
                <ProfileNavItem />
            </section>
            <ul className={`flex flex-col space-y-4 ${!isOpen && "hidden"}`}>
                <NavItem label="nav-item-1" selected />
                <NavItem label="nav-item-2"/>
                <NavItem label="nav-item-3" />
            </ul>
        </nav>
    )
}