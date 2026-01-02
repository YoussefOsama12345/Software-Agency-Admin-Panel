import { FileText, CheckCircle2, FileEdit, Archive } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface ArticleStatsProps {
    total: number;
    published: number;
    draft: number;
    archived: number;
}

export function ArticleStats({ total, published, draft, archived }: ArticleStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Articles"
                value={total}
                subtitle="All time content"
                icon={FileText}
                color="blue"
            />
            <StatsCard
                title="Published"
                value={published}
                subtitle="Live on site"
                icon={CheckCircle2}
                color="green"
            />
            <StatsCard
                title="Drafts"
                value={draft}
                subtitle="Work in progress"
                icon={FileEdit}
                color="purple"
            />
            <StatsCard
                title="Archived"
                value={archived}
                subtitle="Hidden from public"
                icon={Archive}
                color="orange"
            />
        </StatsGrid>
    );
}
