import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from './ProjectCard';

interface Project {
    id: string;
    name: string;
    client: string;
    status: string;
    progress: number;
}

interface RecentProjectsProps {
    projects: Project[];
    className?: string;
}

export function RecentProjects({ projects, className }: RecentProjectsProps) {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>Your latest project activity</CardDescription>
                </div>
                <Link href="/projects">
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                        View all
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Badge>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
