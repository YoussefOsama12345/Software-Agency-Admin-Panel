import { FolderKanban, PlayCircle, CheckCircle2, PauseCircle } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface ProjectStatsProps {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    onHoldProjects: number;
}

export function ProjectStats({ totalProjects, activeProjects, completedProjects, onHoldProjects }: ProjectStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Projects"
                value={totalProjects}
                subtitle="All projects"
                icon={FolderKanban}
                color="blue"
            />
            <StatsCard
                title="Active"
                value={activeProjects}
                subtitle="Currently in progress"
                icon={PlayCircle}
                color="green"
            />
            <StatsCard
                title="Completed"
                value={completedProjects}
                subtitle="Successfully delivered"
                icon={CheckCircle2}
                color="purple"
            />
            <StatsCard
                title="On Hold"
                value={onHoldProjects}
                subtitle="Temporarily paused"
                icon={PauseCircle}
                color="orange"
            />
        </StatsGrid>
    );
}
