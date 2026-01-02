import Link from 'next/link';
import { Edit, Trash2, Eye } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { Project } from '@/types/project.types';

interface ProjectTableProps {
    projects: Project[];
    onDelete?: (id: string) => void;
}

export function ProjectTable({ projects, onDelete }: ProjectTableProps) {
    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
                <p className="text-muted-foreground">No projects found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or create a new project
                </p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => {
                        const progress = project.progress ??
                            (project.tasksCount && project.completedTasksCount
                                ? Math.round((project.completedTasksCount / project.tasksCount) * 100)
                                : 0);

                        const formattedBudget = project.budget
                            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(project.budget)
                            : '-';

                        const formattedDeadline = project.deadline
                            ? new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : '-';

                        return (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <Link href={`/projects/${project.id}`} className="font-medium hover:underline">
                                        {project.name}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {project.clientName || '-'}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={project.status} />
                                </TableCell>
                                <TableCell>
                                    <PriorityBadge priority={project.priority} />
                                </TableCell>
                                <TableCell>{formattedBudget}</TableCell>
                                <TableCell>{formattedDeadline}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 min-w-[100px]">
                                        <Progress value={progress} className="h-2 flex-1" />
                                        <span className="text-sm text-muted-foreground w-10">{progress}%</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" asChild>
                                            <Link href={`/projects/${project.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                            <Link href={`/projects/${project.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <ConfirmDeleteModal
                                            onConfirm={() => {
                                                onDelete?.(project.id);
                                            }}
                                            title={`Delete Project ${project.name}?`}
                                            description="Are you sure you want to delete this project? This action cannot be undone."
                                            trigger={
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
