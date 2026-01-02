'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PenSquare, Lightbulb, Target, Users, Calendar, Share2, MessageSquare } from 'lucide-react';

import { FormPageHeader } from '@/components/common/FormPageHeader';
import { SocialPostForm } from '@/components/social/SocialPostForm';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { CreatePostData } from '@/schemas/social.schema';

const socialTips: Tip[] = [
    {
        icon: Target,
        title: 'Define Your Goal',
        description: 'What do you want to achieve with this post? Engagement, clicks, or awareness?',
    },
    {
        icon: Users,
        title: 'Know Your Audience',
        description: 'Tailor your content and tone to resonate with your followers.',
    },
    {
        icon: Calendar,
        title: 'Timing Matters',
        description: 'Schedule posts when your audience is most active for maximum reach.',
    },
    {
        icon: Share2,
        title: 'Cross-Platform',
        description: 'Customize your message for each platform to optimize performance.',
    },
    {
        icon: MessageSquare,
        title: 'Encourage Interaction',
        description: 'Ask questions or use calls-to-action to spark conversation.',
    },
];

export default function NewPostPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreatePostData, action: 'draft' | 'schedule' | 'publish') => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const message = action === 'draft' ? 'Saved as draft' :
                action === 'schedule' ? 'Post scheduled' : 'Post published';

            toast.success(message);
            router.push('/social');
        } catch (error) {
            console.error('Failed to save post:', error);
            toast.error('Failed to save post');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="New Post"
                description="Compose and schedule a new social media post."
                backHref="/social"
                mode="create"
                icon={PenSquare}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-start">
                <div className="lg:col-span-8">
                    <SocialPostForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        mode="create"
                    />
                </div>

                <FormPageSidebar
                    title="Social Media Tips"
                    description="Best practices for engaging posts"
                    tips={socialTips}
                />
            </div>
        </div>
    );
}
