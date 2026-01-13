'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Briefcase, FileText, AlertCircle, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PortfolioForm } from '@/components/portfolio/PortfolioForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { CreatePortfolioFormData } from '@/schemas/portofolio.schema';

// Mock data - replace with actual API call
const mockPortfolio: Record<string, CreatePortfolioFormData & { id: string }> = {
    '1': {
        id: '1',
        title: 'FinTech Dashboard',
        description: 'A comprehensive financial dashboard for analyzing market trends and managing assets.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        link: 'https://example.com/fintech',
        language: 'en',
    },
    '2': {
        id: '2',
        title: 'Travel Agency Website',
        description: 'Modern travel booking platform with real-time flight data and hotel reservations.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
        link: 'https://example.com/travel',
        language: 'en',
    },
    '3': {
        id: '3',
        title: 'Healthcare App',
        description: 'Patient management system for clinics to streamline appointments and records.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop',
        link: '',
        language: 'ar',
    },
    '4': {
        id: '4',
        title: 'E-Learning Platform',
        description: 'Interactive learning management system with video courses and quizzes.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop',
        link: 'https://example.com/elearning',
        language: 'en',
    },
};

const editTips: Tip[] = [
    {
        icon: Edit,
        title: 'Keep it Fresh',
        description: 'Regularly update screenshots and descriptions.',
    },
    {
        icon: ExternalLink,
        title: 'Verify Links',
        description: 'Ensure all external links are still valid.',
    },
];

export default function EditPortfolioPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [item, setItem] = useState<(CreatePortfolioFormData & { id: string }) | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const data = mockPortfolio[id];
                if (data) {
                    setItem(data);
                } else {
                    toast.error('Project not found');
                    router.push('/portfolio');
                }
            } catch (error) {
                console.error('Error fetching portfolio item:', error);
                toast.error('Failed to load project');
            } finally {
                setIsFetching(false);
            }
        };

        fetchItem();
    }, [id, router]);

    const handleSubmit = async (data: CreatePortfolioFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating Portfolio Item:', id, data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Project updated successfully!');
            router.push('/portfolio');
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error('Failed to update project. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <Skeleton className="h-[500px] w-full rounded-xl" />
                    </div>
                    <div className="lg:col-span-4">
                        <Skeleton className="h-[500px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Project not found</p>
                <Link href="/portfolio" className="mt-4">
                    <Button>Back to Portfolio</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="edit"
                title="Portfolio"
                editingName={item.title}
                backHref="/portfolio"
                icon={Briefcase}
                stats={{
                    label1: 'Views',
                    value1: 1542,
                    label2: 'Clicks',
                    value2: 342,
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <PortfolioForm
                        defaultValues={item}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        onDelete={async () => {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            console.log('Deleting Portfolio project:', id);
                            toast.success('Project deleted successfully');
                            router.push('/portfolio');
                        }}
                        headerTitle="Portfolio Details"
                        headerDescription="Update the project information below."
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Edit Tips"
                    description="Things to consider when editing"
                    tips={editTips}
                />
            </div>
        </div>
    );
}
