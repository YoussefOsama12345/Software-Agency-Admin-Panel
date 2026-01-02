import { ProjectCard } from './ProjectCard';
import { Project } from '@/types/project.types';

interface ProjectGridProps {
    projects: Project[];
    onDelete?: (id: string) => void;
}

export function ProjectGrid({ projects, onDelete }: ProjectGridProps) {
    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No projects found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or create a new project
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} onDelete={onDelete} />
            ))}
        </div>
    );
}
