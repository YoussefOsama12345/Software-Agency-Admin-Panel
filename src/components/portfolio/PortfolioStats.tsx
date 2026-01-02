import { Briefcase, Eye, Link as LinkIcon, Calendar } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface PortfolioStatsProps {
    totalProjects: number;
    totalViews: number;
}

export function PortfolioStats({ totalProjects, totalViews }: PortfolioStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Projects"
                value={totalProjects}
                subtitle="Showcased work"
                icon={Briefcase}
                color="blue"
            />
            <StatsCard
                title="Total Views"
                value={totalViews.toLocaleString()}
                subtitle="Lifetime engagement"
                icon={Eye}
                color="green"
            />
            <StatsCard
                title="Active Links"
                value={totalProjects}
                subtitle="Live project URLs"
                icon={LinkIcon}
                color="purple"
            />
            <StatsCard
                title="Latest Addition"
                value="Today"
                subtitle="Just updated"
                icon={Calendar}
                color="orange"
            />
        </StatsGrid>
    );
}
