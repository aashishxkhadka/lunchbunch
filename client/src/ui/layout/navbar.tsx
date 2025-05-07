import { Link } from "@tanstack/react-router"
import { navigations } from "../../utils/navigations"
import { Input } from "../../components/ui/input"
import { ModeToggle } from "../../components/mode-toggle"
import { Beer, CupSoda } from "lucide-react"

export const Navbar = () => {
    return (
        <>
            <div className="fixed top-0 p-2 z-40 w-full border-b-2 bg-background  flex gap-2">
                <div className="p-2 bg-orange-600 dark:bg-secondary rounded-lg">
                    <CupSoda className="text-white" />
                </div>
                <Input placeholder="Search..." className="" /> <div><ModeToggle /></div>
            </div>
            <div className="fixed bottom-0 px-4  bg-background border-t-2 z-40   flex justify-between items-center gap-4 w-[100%]">
                {
                    navigations.map(nav =>
                        <Link key={nav.label} to={nav.path && nav?.path}>
                            <div className="grid justify-items-center hover:bg-secondary p-4 rounded-md">{nav.icon}
                                {/* <span className="text-xs text-secondary-foreground">{nav.label.charAt(0).toUpperCase() + nav.label.slice(1, 10)}</span> */}
                            </div>
                        </Link>
                    )
                }
            </div >
        </>
    )
}
