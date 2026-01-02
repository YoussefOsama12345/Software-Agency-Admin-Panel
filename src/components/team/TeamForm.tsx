'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Linkedin, Github, Twitter, Facebook, Instagram } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { CreateTeamFormData, createTeamSchema } from '@/schemas/team.schema';

interface TeamFormProps {
    defaultValues?: Partial<CreateTeamFormData>;
    onSubmit: (data: CreateTeamFormData) => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
}

export function TeamForm({
    defaultValues,
    onSubmit,
    isLoading = false,
    submitLabel = 'Add Member'
}: TeamFormProps) {
    const router = useRouter();

    const form = useForm<CreateTeamFormData>({
        resolver: zodResolver(createTeamSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            position: defaultValues?.position || '',
            bio: defaultValues?.bio || '',
            image: defaultValues?.image || '',
            linkedin: defaultValues?.linkedin || '',
            github: defaultValues?.github || '',
            x: defaultValues?.x || '',
            facebook: defaultValues?.facebook || '',
            instagram: defaultValues?.instagram || '',
        },
    });

    const handleSubmit = async (data: CreateTeamFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Info</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Position */}
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Senior Developer"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Image URL */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Image URL *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com/avatar.jpg"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormDescription>
                                    URL to the profile picture.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Bio */}
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Short biography..."
                                        className="min-h-[120px]"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Links</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* LinkedIn */}
                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Linkedin className="h-4 w-4" /> LinkedIn
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://linkedin.com/in/username"
                                            {...field}
                                            value={field.value || ''}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* GitHub */}
                        <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Github className="h-4 w-4" /> GitHub
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://github.com/username"
                                            {...field}
                                            value={field.value || ''}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* X (Twitter) */}
                        <FormField
                            control={form.control}
                            name="x"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Twitter className="h-4 w-4" /> X (Twitter)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://x.com/username"
                                            {...field}
                                            value={field.value || ''}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Facebook */}
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Facebook className="h-4 w-4" /> Facebook
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://facebook.com/username"
                                            {...field}
                                            value={field.value || ''}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Instagram */}
                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Instagram className="h-4 w-4" /> Instagram
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://instagram.com/username"
                                            {...field}
                                            value={field.value || ''}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : submitLabel}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
