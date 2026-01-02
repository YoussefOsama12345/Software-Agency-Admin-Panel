'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FolderPen, FileText, Link as LinkIcon, Image as ImageIcon, ToggleLeft } from 'lucide-react';

import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CategoryForm } from '@/components/blog/category/CategoryForm';
import { Card, CardContent } from '@/components/ui/card';
import { CreateCategoryFormData } from '@/schemas/category.schema';

// Mock data fetcher
const getCategory = async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock data
    return {
        id,
        name: 'Technology',
        slug: 'technology',
        description: 'All about the latest tech trends and software development.',
        status: 'ACTIVE' as const,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
        metaTitle: 'Technology News & Updates',
        metaDescription: 'Stay updated with the latest in technology.',
        language: 'en' as const,
    };
};

const categoryTips = [
    {
        icon: LinkIcon,
        title: 'Updating Slugs',
        description: 'Changing a slug will change the URL of the category page. This might affect SEO if not handled correctly.',
    },
    {
        icon: ImageIcon,
        title: 'Category Images',
        description: 'Update the category image to keep your blog looking fresh and relevant.',
    },
    {
        icon: ToggleLeft,
        title: 'Status Management',
        description: 'Set status to "Inactive" to hide the category and its posts from the public view without deleting them.',
    },
];

interface EditCategoryPageProps {
    params: Promise<{ id: string }>;
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
    const router = useRouter();
    // Unwrap params using React.use()
    const { id } = use(params);

    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState<CreateCategoryFormData | null>(null);

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const data = await getCategory(id);
                setCategory(data);
            } catch (error) {
                toast.error('Failed to load category');
                router.push('/blog/categories');
            } finally {
                setIsLoading(false);
            }
        };
        loadCategory();
    }, [id, router]);

    const [isSaving, setIsSaving] = useState(false);

    const handleUpdate = async (data: CreateCategoryFormData) => {
        setIsSaving(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Updating category:', id, data);
            toast.success('Category updated successfully');
            router.push('/blog/categories');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // TODO: Replace with proper skeleton
    }

    if (!category) {
        return null;
    }

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="edit"
                title="Category"
                editingName={category.name}
                description={`Edit category: ${category.name}`}
                backHref="/blog/categories"
                icon={FolderPen}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-8">
                    <CategoryForm
                        mode="edit"
                        defaultValues={category}
                        onSubmit={handleUpdate}
                        onDelete={async () => {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            console.log('Deleting Category:', id);
                            toast.success('Category deleted successfully');
                            router.push('/blog/categories');
                        }}
                        isLoading={isSaving}
                        submitLabel="Save Changes"
                        headerTitle="Edit Category Details"
                        headerDescription="Update the category information below."
                    />
                </div>

                <FormPageSidebar tips={categoryTips} />
            </div>
        </div>
    );
}
