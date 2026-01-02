import { Article } from '@/schemas/article.schema';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
    articles: Article[];
    onDelete?: (id: string) => void;
}

export function ArticleGrid({ articles, onDelete }: ArticleGridProps) {
    if (articles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg bg-muted/50">
                <p className="text-muted-foreground font-medium">No articles found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try creating a new article to populate the grid.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} onDelete={onDelete} />
            ))}
        </div>
    );
}
