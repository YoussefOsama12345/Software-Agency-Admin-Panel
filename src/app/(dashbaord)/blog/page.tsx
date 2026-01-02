'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Plus, Folder } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { ArticleTable } from '@/components/blog/article/ArticleTable';
import { ArticleGrid } from '@/components/blog/article/ArticleGrid';
import { ArticleStats } from '@/components/blog/article/ArticleStats';
import { ArticleToolbar } from '@/components/blog/article/ArticleToolbar';
import { useArticles } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
    const { articles, isLoading, deleteArticle } = useArticles();
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Filter Logic
    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesSearch =
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.description?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
            const matchesCategory = categoryFilter === 'all' || article.category?.name === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [articles, searchQuery, statusFilter, categoryFilter]);

    // Calculate stats
    const stats = {
        total: articles.length,
        published: articles.filter(a => a.status === 'PUBLISHED').length,
        draft: articles.filter(a => a.status === 'DRAFT').length,
        archived: articles.filter(a => a.status === 'ARCHIVED').length,
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Blog"
                description="Manage your blog articles and content."
            >
                <div className="flex gap-2">
                    <Link href="/blog/categories">
                        <Button variant="outline">
                            <Folder className="mr-2 h-4 w-4" />
                            Manage Categories
                        </Button>
                    </Link>
                    <Link href="/blog/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Article
                        </Button>
                    </Link>
                </div>
            </PageHeader>

            {/* Stats Section */}
            {!isLoading ? (
                <ArticleStats {...stats} />
            ) : (
                <div className="grid gap-4 md:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-32 rounded-xl" />
                    ))}
                </div>
            )}

            {/* Content Section */}
            <div className="space-y-4">
                <ArticleToolbar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    view={view}
                    onViewChange={setView}
                />

                {isLoading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-[300px] rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className={view === 'grid' ? 'block' : 'hidden'}>
                            <ArticleGrid articles={filteredArticles} onDelete={deleteArticle} />
                        </div>
                        <div className={view === 'list' ? 'block' : 'hidden'}>
                            <ArticleTable articles={filteredArticles} onDelete={deleteArticle} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
