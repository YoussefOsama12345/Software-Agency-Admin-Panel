'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles, Edit3, FolderKanban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProjectFormHeaderProps {
    mode: 'create' | 'edit';
    projectName?: string;
    backHref: string;
    stats?: {
        label1: string;
        value1: string | number;
        label2: string;
        value2: string | number;
    };
}

export function ProjectFormHeader({
    mode,
    projectName,
    backHref,
    stats = {
        label1: 'Active Projects',
        value1: 24,
        label2: 'This Month',
        value2: 8,
    },
}: ProjectFormHeaderProps) {
    const isEdit = mode === 'edit';

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Link href={backHref}>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                                {isEdit ? (
                                    <>
                                        <Edit3 className="h-3.5 w-3.5" />
                                        Edit Mode
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-3.5 w-3.5" />
                                        New Project
                                    </>
                                )}
                            </Badge>
                        </div>

                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FolderKanban className="h-6 w-6 text-primary" />
                                </div>
                                {isEdit ? 'Edit Project' : 'Create New Project'}
                            </h1>
                            <p className="text-muted-foreground mt-3 max-w-xl">
                                {isEdit ? (
                                    <>Editing: <span className="font-medium text-foreground">{projectName}</span></>
                                ) : (
                                    'Start a new project by filling in the details below. You can always edit this information later.'
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold">{stats.value1}</p>
                            <p className="text-xs text-muted-foreground">{stats.label1}</p>
                        </div>
                        <Separator orientation="vertical" className="h-12" />
                        <div className="text-center">
                            <p className="text-3xl font-bold">{stats.value2}</p>
                            <p className="text-xs text-muted-foreground">{stats.label2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
