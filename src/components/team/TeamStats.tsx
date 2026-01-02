import { Users, UserCheck, UserPlus, Briefcase } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface TeamStatsProps {
    totalMembers: number;
    activeMembers: number;
    newMembers: number;
    departments: number;
}

export function TeamStats({ totalMembers, activeMembers, newMembers, departments }: TeamStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Members"
                value={totalMembers}
                subtitle="Across all departments"
                icon={Users}
                color="blue"
            />
            <StatsCard
                title="Active Now"
                value={activeMembers}
                subtitle="Currently online"
                icon={UserCheck}
                color="green"
            />
            <StatsCard
                title="New Hires"
                value={`+${newMembers}`}
                subtitle="This month"
                icon={UserPlus}
                color="purple"
            />
            <StatsCard
                title="Departments"
                value={departments}
                subtitle="Functional teams"
                icon={Briefcase}
                color="orange"
            />
        </StatsGrid>
    );
}
