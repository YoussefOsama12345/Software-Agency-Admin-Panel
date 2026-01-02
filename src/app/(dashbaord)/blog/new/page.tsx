'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Newspaper, FileText, Globe, Search, Megaphone } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { ArticleForm } from '@/components/blog/article/ArticleForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { useCreateArticle } from '@/hooks/useArticles';
import { CreateArticleFormData } from '@/schemas/article.schema';

const articleTips: Tip[] = [
    {
        icon: Search,
        title: 'SEO Friendly',
        description: 'Use a clear slug and descriptive meta tags.',
    },
    {
        icon: Megaphone,
        title: 'Compelling Title',
        description: 'Write a headline that grabs attention.',
    },
    {
        icon: Globe,
        title: 'Social Ready',
        description: 'Add Open Graph images for better sharing.',
    },
    {
        icon: FileText,
        title: 'Clear Structure',
        description: 'Use headings and short paragraphs for readability.',
    },
];

export default function NewArticlePage() {
    const router = useRouter();
    const { createArticle, isPending } = useCreateArticle();

    const handleSubmit = async (data: CreateArticleFormData) => {
        try {
            await createArticle(data);
            toast.success('Article created successfully');
            router.push('/blog');
        } catch (error) {
            toast.error('Failed to create article');
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="Article"
                backHref="/blog"
                icon={Newspaper}
                stats={{
                    label1: 'Total Articles',
                    value1: 15,
                    label2: 'Published',
                    value2: 12,
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <ArticleForm
                        onSubmit={handleSubmit}
                        isLoading={isPending}
                        submitLabel="Publish Article"
                        headerTitle="Article Details"
                        headerDescription="Write and publish a new blog post"
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Writing Tips"
                    description="Best practices for engaging content"
                    tips={articleTips}
                />
            </div>
        </div>
    );
}
