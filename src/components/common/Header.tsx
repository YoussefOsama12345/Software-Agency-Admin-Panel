'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronRight, User, LogOut, Settings, Bell } from 'lucide-react';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/theme/ModeToggle';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

// Navigation items for command search
const navigationItems = [
    { name: 'Dashboard', href: '/', category: 'Pages' },
    { name: 'Projects', href: '/projects', category: 'Pages' },
    { name: 'Tasks', href: '/tasks', category: 'Pages' },
    { name: 'Tickets', href: '/tickets', category: 'Pages' },
    { name: 'Clients', href: '/clients', category: 'Pages' },
    { name: 'Team', href: '/team', category: 'Pages' },
    { name: 'Users', href: '/users', category: 'Pages' },
    { name: 'Blog', href: '/blog', category: 'Pages' },
    { name: 'Portfolio', href: '/portfolio', category: 'Pages' },
    { name: 'FAQ', href: '/faq', category: 'Pages' },
    { name: 'Testimonials', href: '/testimonials', category: 'Pages' },
    { name: 'Messages', href: '/messages', category: 'Pages' },
    { name: 'Settings', href: '/settings', category: 'Settings' },
    { name: 'Profile', href: '/settings/profile', category: 'Settings' },
    { name: 'About', href: '/settings/about', category: 'Settings' },
];

function generateBreadcrumbs(pathname: string) {
    const paths = pathname.split('/').filter(Boolean);

    if (paths.length === 0) {
        return [{ name: 'Dashboard', href: '/' }];
    }

    const breadcrumbs = [{ name: 'Dashboard', href: '/' }];

    let currentPath = '';
    paths.forEach((path) => {
        currentPath += `/${path}`;
        const name = path
            .replace(/-/g, ' ')
            .replace(/\[.*\]/, '')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        if (name) {
            breadcrumbs.push({ name, href: currentPath });
        }
    });

    return breadcrumbs;
}

export function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const breadcrumbs = generateBreadcrumbs(pathname);

    // Keyboard shortcut for search
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            {/* Left - Sidebar Trigger + Breadcrumb */}
            <div className="flex items-center gap-2 flex-1">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={crumb.href}>
                                <BreadcrumbItem>
                                    {index === breadcrumbs.length - 1 ? (
                                        <BreadcrumbPage className="font-medium">
                                            {crumb.name}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                                {crumb.name}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbs.length - 1 && (
                                    <BreadcrumbSeparator>
                                        <ChevronRight className="h-4 w-4" />
                                    </BreadcrumbSeparator>
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Center - Search */}
            <div className="flex-1 flex justify-center max-w-md">
                <Button
                    variant="outline"
                    className="relative w-full justify-start text-sm text-muted-foreground bg-muted/50 hover:bg-muted h-10"
                    onClick={() => setOpen(true)}
                >
                    <Search className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline-flex">Search...</span>
                    <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </div>

            {/* Right - Avatar */}
            <div className="flex-1 flex justify-end items-center gap-3">
                <ModeToggle />
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatar.png" alt="User" />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    AD
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Admin User</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    admin@example.com
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/settings/profile" className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings" className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive cursor-pointer" asChild>
                            <Link className='flex items-center gap-2 w-full' href="/login">
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Command Dialog */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {navigationItems
                            .filter((item) => item.category === 'Pages')
                            .map((item) => (
                                <CommandItem
                                    key={item.href}
                                    onSelect={() => {
                                        setOpen(false);
                                        window.location.href = item.href;
                                    }}
                                >
                                    {item.name}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                    <CommandGroup heading="Settings">
                        {navigationItems
                            .filter((item) => item.category === 'Settings')
                            .map((item) => (
                                <CommandItem
                                    key={item.href}
                                    onSelect={() => {
                                        setOpen(false);
                                        window.location.href = item.href;
                                    }}
                                >
                                    {item.name}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </header>
    );
}

export default Header;
