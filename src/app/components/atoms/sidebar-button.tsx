import { Button } from "./button";
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils"

interface SideBarButtonProps {
    className?: string,
    isOpen: boolean,
    onClick?: () => void
}
export default function SideBarButton ({className, isOpen, onClick}: SideBarButtonProps) {
    const handleClick = () => onClick && onClick()
    return (
        <Button variant={'default'} size={'icon'} className={cn("rounded-full", className)} onClick={handleClick}>
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
    )

}