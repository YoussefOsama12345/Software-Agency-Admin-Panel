import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, Eye, Calendar, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { Project } from '@/types/project.types';

interface ProjectCardProps {
    project: Project;
    onDelete?: (id: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
    const progress = project.progress ??
        (project.tasksCount && project.completedTasksCount
            ? Math.round((project.completedTasksCount / project.tasksCount) * 100)
            : 0);

    const formattedBudget = project.budget
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(project.budget)
        : null;

    const formattedDeadline = project.deadline
        ? new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : null;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1 flex-1 min-w-0">
                    <Link href={`/projects/${project.id}`} className="hover:underline">
                        <h3 className="font-semibold truncate">{project.name}</h3>
                    </Link>
                    {project.clientName && (
                        <p className="text-sm text-muted-foreground">{project.clientName}</p>
                    )}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/projects/${project.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/projects/${project.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                onDelete?.(project.id);
                            }}
                            title={`Delete Project ${project.name}?`}
                            description="Are you sure you want to delete this project? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Project
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Description */}
                {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                    </p>
                )}

                {/* Status & Priority */}
                <div className="flex items-center gap-2">
                    <StatusBadge status={project.status} />
                    <PriorityBadge priority={project.priority} />
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {formattedBudget && (
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{formattedBudget}</span>
                        </div>
                    )}
                    {formattedDeadline && (
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formattedDeadline}</span>
                        </div>
                    )}
                </div>

                {/* Progress */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </CardContent>
        </Card>
    );
}
