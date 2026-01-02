'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Newspaper, FileText, Globe, Search, Megaphone } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { ArticleForm } from '@/components/blog/article/ArticleForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { useArticle, useUpdateArticle } from '@/hooks/useArticles';
import { CreateArticleFormData } from '@/schemas/article.schema';
import { Skeleton } from '@/components/ui/skeleton';


const articleTips: Tip[] = [
    {
        icon: Search,
        title: 'Review SEO',
        description: 'Check if your keywords are still relevant.',
    },
    {
        icon: Megaphone,
        title: 'Update Content',
        description: 'Keep information fresh and accurate.',
    },
    {
        icon: Globe,
        title: 'Check Links',
        description: 'Ensure all external links are working.',
    },
    {
        icon: FileText,
        title: 'Optimize Images',
        description: 'Update images if better ones are available.',
    },
];

interface EditArticlePageProps {
    params: Promise<{ id: string }>;
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { article, isLoading: isLoadingArticle } = useArticle(id);
    const { updateArticle, isPending } = useUpdateArticle();

    const handleSubmit = async (data: CreateArticleFormData) => {
        try {
            await updateArticle(id, data);
            toast.success('Article updated successfully');
            router.push('/blog');
        } catch (error) {
            toast.error('Failed to update article');
            console.error(error);
        }
    };

    if (isLoadingArticle) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-[200px] w-full" />
                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <Skeleton className="h-[600px] w-full" />
                    </div>
                    <div className="lg:col-span-4">
                        <Skeleton className="h-[400px] w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="Article"
                backHref="/blog"
                icon={Newspaper}
                stats={{
                    label1: 'Status',
                    value1: article.status,
                    label2: 'Views',
                    value2: 1250, // Mock data
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <ArticleForm
                        defaultValues={article}
                        onSubmit={handleSubmit}
                        onDelete={async () => {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            console.log('Deleting Article:', id);
                            toast.success('Article deleted successfully');
                            router.push('/blog');
                        }}
                        isLoading={isPending}
                        submitLabel="Save Changes"
                        headerTitle="Edit Article"
                        headerDescription={`Editing "${article.title}"`}
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Editing Tips"
                    description="Improvements for existing content"
                    tips={articleTips}
                />
            </div>
        </div>
    );
}
