import { Users, UserCheck, TrendingUp, ShieldCheck } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface UserStatsProps {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    adminsCount: number;
}

export function UserStats({ totalUsers, activeUsers, newUsers, adminsCount }: UserStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Users"
                value={totalUsers}
                subtitle="Registered accounts"
                icon={Users}
                color="blue"
            />
            <StatsCard
                title="Active Users"
                value={activeUsers}
                subtitle="Currently active"
                icon={UserCheck}
                color="green"
            />
            <StatsCard
                title="Growth"
                value={`+${newUsers}`}
                subtitle="New users this month"
                icon={TrendingUp}
                color="purple"
            />
            <StatsCard
                title="Admins"
                value={adminsCount}
                subtitle="System administrators"
                icon={ShieldCheck}
                color="orange"
            />
        </StatsGrid>
    );
}
