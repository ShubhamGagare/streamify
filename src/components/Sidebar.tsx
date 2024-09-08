import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Music, Users, BarChart, Settings, LogOut, } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from 'clsx'

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Music, label: "Songs", href: "/songs" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: BarChart, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12 min-h-screen", className)}>
            <div className="space-y-4 py-2">
                <div className="px-3 py-2 space-y-2">
                    <h2 className="mb-2 p-4 text-4xl font-semibold tracking-tight text-yellow-400">
                        Streamify
                    </h2>
                    <div className="space-y-4 py-2">
                        {navItems.map((item) => (


                            <Button key={item.href} variant="ghost" className={clsx('w-full text-md font-semibold justify-start ',{ ' bg-white text-primary': item.label==="Dashboard" })}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <Button variant="ghost" size="icon">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Log out</span>
                </Button>
            </div>
        </div>
    )
}