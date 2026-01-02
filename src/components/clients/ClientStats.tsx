import { Building2, Users, DollarSign, TrendingUp } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface ClientStatsProps {
    totalClients: number;
    activeProjects: number;
    totalRevenue: number;
    growthRate: number;
}

export function ClientStats({ totalClients, activeProjects, totalRevenue, growthRate }: ClientStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Clients"
                value={totalClients}
                subtitle="+2 from last month"
                icon={Users}
                color="blue"
            />
            <StatsCard
                title="Active Projects"
                value={activeProjects}
                subtitle="Across various industries"
                icon={Building2}
                color="green"
            />
            <StatsCard
                title="Total Revenue"
                value={`$${totalRevenue.toLocaleString()}`}
                subtitle="+12% from last month"
                icon={DollarSign}
                color="purple"
            />
            <StatsCard
                title="Growth Rate"
                value={`${growthRate}%`}
                subtitle="Year over Year"
                icon={TrendingUp}
                color="orange"
            />
        </StatsGrid>
    );
}
