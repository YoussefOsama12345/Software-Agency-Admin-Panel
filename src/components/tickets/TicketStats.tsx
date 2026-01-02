import { AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface TicketStatsProps {
    openCount: number;
    inProgressCount: number;
    resolvedCount: number;
    closedCount: number;
}

export function TicketStats({ openCount, inProgressCount, resolvedCount, closedCount }: TicketStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Open"
                value={openCount}
                subtitle="Awaiting response"
                icon={AlertCircle}
                color="blue"
            />
            <StatsCard
                title="In Progress"
                value={inProgressCount}
                subtitle="Being handled"
                icon={Clock}
                color="green"
            />
            <StatsCard
                title="Resolved"
                value={resolvedCount}
                subtitle="Issues fixed"
                icon={CheckCircle2}
                color="purple"
            />
            <StatsCard
                title="Closed"
                value={closedCount}
                subtitle="Archived tickets"
                icon={XCircle}
                color="orange"
            />
        </StatsGrid>
    );
}
