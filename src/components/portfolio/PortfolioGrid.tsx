import { PortfolioItem } from './PortfolioCard';
import { PortfolioCard } from './PortfolioCard';

interface PortfolioGridProps {
    items: PortfolioItem[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No portfolio projects found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or add a new project
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
                <PortfolioCard key={item.id} item={item} />
            ))}
        </div>
    );
}
