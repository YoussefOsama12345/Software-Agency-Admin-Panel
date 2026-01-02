'use client';

import Link from 'next/link';
import {
    Lightbulb,
    Target,
    Users,
    DollarSign,
    Calendar,
    FolderKanban
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Tip {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface ProjectFormSidebarProps {
    mode?: 'create' | 'edit';
    tips?: Tip[];
}

const defaultCreateTips: Tip[] = [
    {
        icon: Target,
        title: 'Set Clear Milestones',
        description: 'Break your project into phases with measurable goals.',
    },
    {
        icon: Users,
        title: 'Assign Team Early',
        description: 'Identify key team members before kickoff.',
    },
    {
        icon: DollarSign,
        title: 'Budget Buffer',
        description: 'Include 10-15% contingency in your budget.',
    },
    {
        icon: Calendar,
        title: 'Realistic Deadlines',
        description: 'Factor in review cycles and dependencies.',
    },
];

const defaultEditTips: Tip[] = [
    {
        icon: Target,
        title: 'Review Milestones',
        description: 'Ensure milestones align with updated project scope.',
    },
    {
        icon: Users,
        title: 'Update Team',
        description: 'Inform team members of any changes.',
    },
    {
        icon: DollarSign,
        title: 'Track Budget',
        description: 'Verify budget adjustments are documented.',
    },
    {
        icon: Calendar,
        title: 'Check Deadlines',
        description: 'Confirm timeline changes with stakeholders.',
    },
];

export function ProjectFormSidebar({
    mode = 'create',
    tips
}: ProjectFormSidebarProps) {
    const displayTips = tips || (mode === 'edit' ? defaultEditTips : defaultCreateTips);
    const title = mode === 'edit' ? 'Edit Tips' : 'Project Tips';
    const description = mode === 'edit'
        ? 'Things to consider when editing'
        : 'Best practices for successful projects';

    return (
        <div className="lg:col-span-4 flex flex-col">
            <Card className="flex-1 flex flex-col">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <CardTitle className="text-base">{title}</CardTitle>
                    </div>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    {displayTips.map((tip, index) => (
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

                    <Separator className="my-4" />

                    {/* Quick Links */}
                    <div className="pt-2 space-y-3">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Links</p>
                        <div className="grid grid-cols-2 gap-2">
                            <Link href="/clients" className="group flex flex-col items-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted hover:border-primary/30 transition-all">
                                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <Users className="h-4 w-4 text-blue-600" />
                                </div>
                                <span className="text-xs font-medium text-center">Clients</span>
                            </Link>
                            <Link href="/projects" className="group flex flex-col items-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted hover:border-primary/30 transition-all">
                                <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                    <FolderKanban className="h-4 w-4 text-purple-600" />
                                </div>
                                <span className="text-xs font-medium text-center">Projects</span>
                            </Link>
                            <Link href="/tasks" className="group flex flex-col items-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted hover:border-primary/30 transition-all">
                                <div className="h-9 w-9 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                    <Target className="h-4 w-4 text-green-600" />
                                </div>
                                <span className="text-xs font-medium text-center">Tasks</span>
                            </Link>
                            <Link href="/team" className="group flex flex-col items-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted hover:border-primary/30 transition-all">
                                <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                                    <Calendar className="h-4 w-4 text-orange-600" />
                                </div>
                                <span className="text-xs font-medium text-center">Calendar</span>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
