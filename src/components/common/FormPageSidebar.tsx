'use client';

import Link from 'next/link';
import {
    Lightbulb,
    Target,
    Users,
    Calendar,
    FolderKanban,
    LucideIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export interface Tip {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface QuickLink {
    href: string;
    label: string;
    icon: LucideIcon;
    color: string; // e.g., 'blue', 'purple', 'green', 'orange'
}

interface FormPageSidebarProps {
    title?: string;
    description?: string;
    tips?: Tip[];
    quickLinks?: QuickLink[];
    showQuickLinks?: boolean;
}

const defaultQuickLinks: QuickLink[] = [
    { href: '/clients', label: 'Clients', icon: Users, color: 'blue' },
    { href: '/projects', label: 'Projects', icon: FolderKanban, color: 'purple' },
    { href: '/tasks', label: 'Tasks', icon: Target, color: 'green' },
    { href: '/team', label: 'Calendar', icon: Calendar, color: 'orange' },
];

const colorClasses: Record<string, { bg: string; hover: string; text: string }> = {
    blue: { bg: 'bg-blue-500/10', hover: 'group-hover:bg-blue-500/20', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-500/10', hover: 'group-hover:bg-purple-500/20', text: 'text-purple-600' },
    green: { bg: 'bg-green-500/10', hover: 'group-hover:bg-green-500/20', text: 'text-green-600' },
    orange: { bg: 'bg-orange-500/10', hover: 'group-hover:bg-orange-500/20', text: 'text-orange-600' },
    red: { bg: 'bg-red-500/10', hover: 'group-hover:bg-red-500/20', text: 'text-red-600' },
    yellow: { bg: 'bg-yellow-500/10', hover: 'group-hover:bg-yellow-500/20', text: 'text-yellow-600' },
    primary: { bg: 'bg-primary/10', hover: 'group-hover:bg-primary/20', text: 'text-primary' },
};

export function FormPageSidebar({
    title = 'Tips',
    description = 'Best practices for success',
    tips = [],
    quickLinks = defaultQuickLinks,
    showQuickLinks = true,
}: FormPageSidebarProps) {
    return (
        <div className="lg:col-span-4 flex flex-col">
            <Card className="flex-1 flex flex-col">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <CardTitle className="text-base">{title}</CardTitle>
                    </div>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    {tips.map((tip, index) => (
                        <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center shrink-0 shadow-sm">
                                <tip.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-sm">{tip.title}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                            </div>
                        </div>
                    ))}

                    {showQuickLinks && quickLinks.length > 0 && (
                        <>
                            <Separator className="my-4" />
                            <div className="pt-2 space-y-3">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Links</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickLinks.map((link, index) => {
                                        const colors = colorClasses[link.color] || colorClasses.primary;
                                        return (
                                            <Link
                                                key={index}
                                                href={link.href}
                                                className="group flex flex-col items-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted hover:border-primary/30 transition-all"
                                            >
                                                <div className={`h-9 w-9 rounded-lg ${colors.bg} flex items-center justify-center ${colors.hover} transition-colors`}>
                                                    <link.icon className={`h-4 w-4 ${colors.text}`} />
                                                </div>
                                                <span className="text-xs font-medium text-center">{link.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
