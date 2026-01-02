'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, FileText, Image as ImageIcon, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

import { PortfolioForm } from '@/components/portfolio/PortfolioForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { CreatePortfolioFormData } from '@/schemas/portofolio.schema';

const portfolioTips: Tip[] = [
    {
        icon: ImageIcon,
        title: 'High Quality Images',
        description: 'Use high-resolution images to make a great first impression.',
    },
    {
        icon: FileText,
        title: 'Concise Descriptions',
        description: 'Focus on the problem solved and the results achieved.',
    },
    {
        icon: LinkIcon,
        title: 'Working Links',
        description: 'Ensure the project link is active and accessible.',
    },
    {
        icon: Briefcase,
        title: 'Highlight Skills',
        description: 'Mention key technologies and skills used in the project.',
    },
];

export default function NewPortfolioPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreatePortfolioFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating Portfolio Item:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Project added to portfolio!');
            router.push('/portfolio');
        } catch (error) {
            console.error('Error creating portfolio item:', error);
            toast.error('Failed to add project. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Header */}
            <FormPageHeader
                mode="create"
                title="Portfolio"
                backHref="/portfolio"
                icon={Briefcase}
                stats={{
                    label1: 'Total Projects',
                    value1: 12, // Mock data
                    label2: 'Views',
                    value2: 1250, // Mock data
                }}
            />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
                {/* Form Section */}
                <div className="lg:col-span-8">
                    <PortfolioForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        headerTitle="Project Details"
                        headerDescription="Add a new project to your portfolio showcase"
                    />
                </div>

                {/* Sidebar */}
                <FormPageSidebar
                    title="Portfolio Tips"
                    description="Best practices for a stunning portfolio"
                    tips={portfolioTips}
                />
            </div>
        </div>
    );
}
