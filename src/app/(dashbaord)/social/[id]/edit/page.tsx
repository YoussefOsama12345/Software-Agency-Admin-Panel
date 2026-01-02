'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PenSquare, Target, Users, Calendar, Share2, MessageSquare } from 'lucide-react';

import { FormPageHeader } from '@/components/common/FormPageHeader';
import { SocialPostForm } from '@/components/social/SocialPostForm';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { CreatePostData, Platform } from '@/schemas/social.schema';

const socialTips: Tip[] = [
    {
        icon: Target,
        title: 'Refine Your Message',
        description: 'Update your post to better align with your current goals.',
    },
    {
        icon: Users,
        title: 'Re-evaluate Audience',
        description: 'Has your target audience changed? adjust content accordingly.',
    },
    {
        icon: Calendar,
        title: 'Check Timing',
        description: 'Ensure the scheduled time is still optimal.',
    },
    {
        icon: Share2,
        title: 'Verify Platforms',
        description: 'Make sure you are targeting the right platforms.',
    },
    {
        icon: MessageSquare,
        title: 'Engagement Plan',
        description: 'Be ready to respond to comments once published.',
    },
];

// Mock fetch function
const fetchPost = async (id: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
        id,
        content: 'Excited to announce our new product launch! 🚀 Stay tuned for more updates.',
        platforms: ['facebook', 'instagram', 'twitter'] as Platform[],
        hashtags: ['launch', 'product', 'innovation'],
        status: 'scheduled',
        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    };
};

export default function EditPostPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [initialData, setInitialData] = useState<Partial<CreatePostData> | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await fetchPost(params.id);
                setInitialData(data);
            } catch (error) {
                console.error('Failed to load post:', error);
                toast.error('Failed to load post');
                router.push('/social');
            } finally {
                setIsFetching(false);
            }
        };
        loadPost();
    }, [params.id, router]);

    const handleSubmit = async (data: CreatePostData, action: 'draft' | 'schedule' | 'publish') => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const message = action === 'draft' ? 'Updated draft' :
                action === 'schedule' ? 'Schedule updated' : 'Post updated';

            toast.success(message);
            router.push('/social');
        } catch (error) {
            console.error('Failed to update post:', error);
            toast.error('Failed to update post');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success('Post deleted');
            router.push('/social');
        } catch (error) {
            toast.error('Failed to delete post');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="flex justify-center py-10">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <FormPageHeader
                title="Edit Post"
                description={`Edit post ${params.id}`}
                backHref="/social"
                mode="edit"
                icon={PenSquare}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-start">
                <div className="lg:col-span-8">
                    <SocialPostForm
                        defaultValues={initialData}
                        onSubmit={handleSubmit}
                        onDelete={handleDelete}
                        isLoading={isLoading}
                        headerTitle="Edit Post Details"
                        headerDescription="Update your social media post"
                        mode="edit"
                    />
                </div>

                <FormPageSidebar
                    title="Editing Tips"
                    description="Improvements for your post"
                    tips={socialTips}
                />
            </div>
        </div>
    );
}
