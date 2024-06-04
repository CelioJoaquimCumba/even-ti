import { Button } from "./button";
import { ChevronLeftIcon, ChevronRightIcon, Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils"

interface SideBarButtonProps {
    className?: string,
    isOpen: boolean,
    onClick?: () => void
}
export default function SideBarButton ({className, isOpen, onClick}: SideBarButtonProps) {
    const handleClick = () => onClick && onClick()
    return (
        <div className="flex">
            <Button variant={'default'} size={'icon'} className={cn("rounded-full hidden lg:flex", className)} onClick={handleClick}>
                {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Button>
            <Button variant={'default'} size={'icon'} className={cn("rounded-full flex lg:hidden", className)} onClick={handleClick}>
                {isOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
            </Button>
        </div>
    )

}