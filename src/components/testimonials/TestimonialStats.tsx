import { MessageSquareQuote, Star, ShieldCheck, EyeOff } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface TestimonialStatsProps {
    total: number;
    averageRating: number;
    activeCount: number;
    fiveStarCount: number;
    hiddenCount: number;
}

export function TestimonialStats({ total, averageRating, fiveStarCount, hiddenCount }: TestimonialStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Reviews"
                value={total}
                subtitle="All time collected"
                icon={MessageSquareQuote}
                color="blue"
            />
            <StatsCard
                title="Average Rating"
                value={averageRating.toFixed(1)}
                subtitle="Out of 5 stars"
                icon={Star}
                color="green"
            />
            <StatsCard
                title="5-Star Reviews"
                value={fiveStarCount}
                subtitle="Total perfect scores"
                icon={ShieldCheck}
                color="purple"
            />
            <StatsCard
                title="Hidden / Pending"
                value={hiddenCount}
                subtitle="Requires moderation"
                icon={EyeOff}
                color="orange"
            />
        </StatsGrid>
    );
}
