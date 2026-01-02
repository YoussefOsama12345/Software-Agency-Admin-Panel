'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Hash, Calendar, X, Loader2, Save, Send, PenSquare } from 'lucide-react';
import {
    RiFacebookFill,
    RiInstagramFill,
    RiTwitterXFill,
    RiLinkedinFill,
    RiYoutubeFill,
} from 'react-icons/ri';
import { Music2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { cn } from '@/lib/utils';
import { createPostSchema, CreatePostData, Platform } from '@/schemas/social.schema';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

const platforms: { id: Platform; name: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { id: 'facebook', name: 'Facebook', icon: RiFacebookFill, color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: RiInstagramFill, color: 'bg-pink-500' },
    { id: 'twitter', name: 'X', icon: RiTwitterXFill, color: 'bg-black' },
    { id: 'linkedin', name: 'LinkedIn', icon: RiLinkedinFill, color: 'bg-blue-700' },
    { id: 'tiktok', name: 'TikTok', icon: Music2, color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', icon: RiYoutubeFill, color: 'bg-red-600' },
];

interface SocialPostFormProps {
    defaultValues?: Partial<CreatePostData>;
    onSubmit: (data: CreatePostData, action: 'draft' | 'schedule' | 'publish') => Promise<void>;
    onDelete?: () => Promise<void>;
    isLoading?: boolean;
    headerTitle?: string;
    headerDescription?: string;
    mode?: 'create' | 'edit';
}

export function SocialPostForm({
    defaultValues,
    onSubmit,
    onDelete,
    isLoading = false,
    headerTitle = "Post Details",
    headerDescription = "Compose your social media post",
    mode = 'create'
}: SocialPostFormProps) {
    const [hashtags, setHashtags] = useState<string[]>(defaultValues?.hashtags || []);
    const [hashtagInput, setHashtagInput] = useState('');
    const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
        defaultValues?.scheduledAt ? new Date(defaultValues.scheduledAt) : undefined
    );

    const form = useForm<CreatePostData>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            content: defaultValues?.content || '',
            platforms: defaultValues?.platforms || [],
            hashtags: defaultValues?.hashtags || [],
            scheduledAt: defaultValues?.scheduledAt,
        },
    });

    const selectedPlatforms = form.watch('platforms') || [];
    const content = form.watch('content');

    const togglePlatform = (platformId: Platform) => {
        const current = form.getValues('platforms') || [];
        form.setValue(
            'platforms',
            current.includes(platformId)
                ? current.filter((p) => p !== platformId)
                : [...current, platformId],
            { shouldDirty: true }
        );
    };

    const addHashtag = () => {
        const tag = hashtagInput.trim().replace(/^#/, '');
        if (tag && !hashtags.includes(tag)) {
            const newHashtags = [...hashtags, tag];
            setHashtags(newHashtags);
            form.setValue('hashtags', newHashtags, { shouldDirty: true });
            setHashtagInput('');
        }
    };

    const removeHashtag = (tagToRemove: string) => {
        const newHashtags = hashtags.filter((tag) => tag !== tagToRemove);
        setHashtags(newHashtags);
        form.setValue('hashtags', newHashtags, { shouldDirty: true });
    };

    const handleFormSubmit = (action: 'draft' | 'schedule' | 'publish') => {
        const data = form.getValues();
        if (scheduledDate) {
            data.scheduledAt = scheduledDate.toISOString();
        }
        data.hashtags = hashtags;
        onSubmit(data, action);
    };

    return (
        <Card className="flex flex-col">
            <FormCardHeader
                title={headerTitle}
                description={headerDescription}
                icon={PenSquare}
            />
            <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                    <Label className="text-base font-semibold">Platforms</Label>
                    <div className="flex flex-wrap gap-2">
                        {platforms.map((p) => {
                            const Icon = p.icon;
                            const isSelected = selectedPlatforms.includes(p.id);
                            return (
                                <Button
                                    key={p.id}
                                    type="button"
                                    variant={isSelected ? 'default' : 'outline'}
                                    size="sm"
                                    className={cn(
                                        'gap-2 transition-all',
                                        isSelected && p.color,
                                        isSelected && 'text-white border-transparent'
                                    )}
                                    onClick={() => togglePlatform(p.id)}
                                >
                                    <Icon className="h-4 w-4" />
                                    {p.name}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-base font-semibold">Content</Label>
                    <Textarea
                        placeholder="What's on your mind?"
                        className="min-h-[150px] resize-y"
                        {...form.register('content')}
                    />
                    <div className="flexjustify-end text-xs text-muted-foreground text-right w-full">
                        {content?.length || 0} characters
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-base font-semibold">Hashtags</Label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add hashtag..."
                            value={hashtagInput}
                            onChange={(e) => setHashtagInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                            className="w-full"
                        />
                        <Button type="button" variant="secondary" size="icon" onClick={addHashtag}>
                            <Hash className="h-4 w-4" />
                        </Button>
                    </div>
                    {hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {hashtags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="gap-1 pl-2 pr-1 py-1 text-sm">
                                    #{tag}
                                    <button
                                        type="button"
                                        onClick={() => removeHashtag(tag)}
                                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5 transition-colors"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <Label className="text-base font-semibold">Schedule (Optional)</Label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !scheduledDate && "text-muted-foreground")}>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {scheduledDate ? format(scheduledDate, 'PPP') : 'Select date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                    mode="single"
                                    selected={scheduledDate}
                                    onSelect={setScheduledDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t px-6 py-4">
                <div className="flex w-full sm:w-auto gap-2">
                    {mode === 'edit' && onDelete && (
                        <ConfirmDeleteModal
                            trigger={
                                <Button type="button" variant="destructive" disabled={isLoading} className="w-full sm:w-auto">
                                    <span className="mr-2">Delete</span>
                                </Button>
                            }
                            title="Delete Post"
                            description="Are you sure you want to delete this post? This action cannot be undone."
                            onConfirm={onDelete}
                            variant="destructive"
                            confirmText="Delete Post"
                        />
                    )}
                </div>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleFormSubmit('draft')}
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {!isLoading && <Save className="mr-2 h-4 w-4" />}
                        Save Draft
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleFormSubmit(scheduledDate ? 'schedule' : 'publish')}
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : scheduledDate ? (
                            <Calendar className="mr-2 h-4 w-4" />
                        ) : (
                            <Send className="mr-2 h-4 w-4" />
                        )}
                        {scheduledDate ? 'Schedule' : 'Publish'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
