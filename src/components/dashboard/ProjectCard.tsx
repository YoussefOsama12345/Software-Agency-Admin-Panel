import Link from 'next/link';

import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/common/StatusBadge';

interface ProjectCardProps {
    id: string;
    name: string;
    client: string;
    status: string;
    progress: number;
}

export function ProjectCard({ id, name, client, status, progress }: ProjectCardProps) {
    return (
        <Link href={`/projects/${id}`} className="block">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{name}</p>
                        <StatusBadge status={status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{client}</p>
                </div>
                <div className="w-24 ml-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                </div>
            </div>
        </Link>
    );
}
