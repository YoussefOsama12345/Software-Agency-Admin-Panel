'use client';

import { DollarSign, CheckCircle2, Zap } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';
import { Service } from '@/schemas/service.schema';

interface ServicesStatsProps {
    services: Service[];
}

export function ServicesStats({ services }: ServicesStatsProps) {
    const totalServices = services.length;
    const activeServices = services.filter(s => s.status === 'ACTIVE').length;
    const inactiveServices = services.filter(s => s.status === 'INACTIVE').length;
    const newThisMonth = services.filter(s => {
        const date = new Date(s.createdAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    return (
        <StatsGrid>
            <StatsCard
                title="Total Services"
                value={totalServices.toString()}
                subtitle="All listed services"
                icon={Zap}
                color="blue"
            />
            <StatsCard
                title="Active Services"
                value={activeServices.toString()}
                subtitle="Currently available"
                icon={CheckCircle2}
                color="green"
            />
            <StatsCard
                title="Inactive Services"
                value={inactiveServices.toString()}
                subtitle="Currently unavailable"
                icon={CheckCircle2}
                color="red"
            />
            <StatsCard
                title="New This Month"
                value={newThisMonth.toString()}
                subtitle="Added recently"
                icon={Zap}
                color="orange"
            />
        </StatsGrid>
    );
}
