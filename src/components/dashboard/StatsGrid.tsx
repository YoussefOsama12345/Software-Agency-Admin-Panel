import { StatsCard, StatsCardProps } from '@/components/common/StatsCard';

interface StatsGridProps {
    stats: StatsCardProps[];
}

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <StatsCard key={stat.title} {...stat} />
            ))}
        </div>
    );
}
