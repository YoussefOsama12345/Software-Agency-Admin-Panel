"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { User, Settings, Info, Palette, ShieldCheck, Share2 } from "lucide-react"

interface SettingsSidebarProps extends React.HTMLAttributes<HTMLElement> { }

const sidebarNavItems = [
    {
        title: "General",
        href: "/settings",
        icon: Settings,
    },
    {
        title: "Profile",
        href: "/settings/profile",
        icon: User,
    },
    {
        title: "Appearance",
        href: "/settings/appearance",
        icon: Palette,
    },
    {
        title: "Security",
        href: "/settings/security",
        icon: ShieldCheck,
    },
    {
        title: "About",
        href: "/settings/about",
        icon: Info,
    },
    {
        title: "Social Accounts",
        href: "/settings/social-accounts",
        icon: Share2,
    },
]

export function SettingsSidebar({ className, ...props }: SettingsSidebarProps) {
    const pathname = usePathname()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 items-start",
                className
            )}
            {...props}
        >
            {sidebarNavItems.map((item) => {
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                    >
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-auto min-w-[180px] justify-start gap-2 rounded-lg px-4 my-1",
                                pathname === item.href
                                    ? "bg-primary/5 text-primary hover:bg-primary/10 font-medium"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",

                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Button>
                    </Link>
                )
            })}
        </nav>
    )
}
