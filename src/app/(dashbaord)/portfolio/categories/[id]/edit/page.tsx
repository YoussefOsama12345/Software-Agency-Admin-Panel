'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FolderPen, FileText, Link as LinkIcon, Image as ImageIcon, ToggleLeft } from 'lucide-react';

import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar } from '@/components/common/FormPageSidebar';
import { PortfolioCategoryForm } from '@/components/portfolio/category/PortfolioCategoryForm';
import { CreateCategoryFormData } from '@/schemas/category.schema';

// Mock data fetcher
const getCategory = async (id: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock data
    return {
        id,
        name: 'Web Development',
        slug: 'web-development',
        description: 'Websites and web applications',
        status: 'ACTIVE' as const,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
        metaTitle: 'Web Development Projects',
        metaDescription: 'Showcase of our web development projects.',
        language: 'en' as const,
    };
};

const categoryTips = [
    {
        icon: LinkIcon,
        title: 'Updating Slugs',
        description: 'Changing a slug will change the URL of the category page. Ensure redirects are handled if necessary.',
    },
    {
        icon: ImageIcon,
        title: 'Category Images',
        description: 'High-quality cover images help your portfolio categories stand out.',
    },
    {
        icon: ToggleLeft,
        title: 'Status Management',
        description: 'Use "Inactive" status to draft categories or hide them temporarily.',
    },
];

interface EditPortfolioCategoryPageProps {
    params: Promise<{ id: string }>;
}

export default function EditPortfolioCategoryPage({ params }: EditPortfolioCategoryPageProps) {
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
                router.push('/portfolio/categories');
            } finally {
                setIsLoading(false);
            }
        };
        loadCategory();
    }, [id, router]);

    const handleUpdate = async (data: CreateCategoryFormData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Updating Portfolio category:', id, data);
        toast.success('Category updated successfully');
        router.push('/portfolio/categories');
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
                title="Portfolio Category"
                editingName={category.name}
                description={`Edit category: ${category.name}`}
                backHref="/portfolio/categories"
                icon={FolderPen}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-8">
                    <PortfolioCategoryForm
                        mode="edit"
                        defaultValues={category}
                        onSubmit={handleUpdate}
                        onDelete={async () => {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            console.log('Deleting Portfolio category:', id);
                            toast.success('Category deleted successfully');
                            router.push('/portfolio/categories');
                        }}
                        headerTitle="Category Details"
                        headerDescription="Update the category information below."
                    />
                </div>

                <FormPageSidebar tips={categoryTips} />
            </div>
        </div>
    );
}
