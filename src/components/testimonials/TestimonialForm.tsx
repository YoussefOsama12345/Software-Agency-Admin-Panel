'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { CreateTestimonialFormData, UpdateTestimonialFormData, createTestimonialSchema, updateTestimonialSchema } from '@/schemas/testimonial.schema';
import { cn } from '@/lib/utils';

interface TestimonialFormProps {
    mode: 'create' | 'edit';
    defaultValues?: Partial<UpdateTestimonialFormData>;
    onSubmit: (data: CreateTestimonialFormData | UpdateTestimonialFormData) => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
}

export function TestimonialForm({
    mode,
    defaultValues,
    onSubmit,
    isLoading = false,
    submitLabel
}: TestimonialFormProps) {
    const router = useRouter();

    const form = useForm<CreateTestimonialFormData | UpdateTestimonialFormData>({
        resolver: zodResolver(mode === 'create' ? createTestimonialSchema : updateTestimonialSchema) as Resolver<CreateTestimonialFormData | UpdateTestimonialFormData>,
        defaultValues: {
            clientName: defaultValues?.clientName || '',
            role: defaultValues?.role || '',
            company: defaultValues?.company || '',
            content: defaultValues?.content || '',
            rating: defaultValues?.rating || 5,
            image: defaultValues?.image || '',
            isActive: defaultValues?.isActive ?? true,
        },
    });

    const handleSubmit = async (data: CreateTestimonialFormData | UpdateTestimonialFormData) => {
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
                    {/* Client Name */}
                    <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client Name *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Jane Doe"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Role */}
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="CEO, Marketing Director..."
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Company */}
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Acme Corp"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image URL */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Client Image URL</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        {...field}
                                        value={field.value || ''}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormDescription>Link to the client's profile picture.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Rating */}
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() => field.onChange(star)}
                                                className={cn(
                                                    "p-1 hover:scale-110 transition-transform focus:outline-none",
                                                    (field.value || 0) >= star ? "text-yellow-400" : "text-muted-foreground/30"
                                                )}
                                            >
                                                <Star className="h-6 w-6 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Content */}
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Testimonial Content *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="The team was amazing to work with..."
                                        className="min-h-[100px]"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Is Active */}
                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Active Status</FormLabel>
                                    <FormDescription>
                                        Show this testimonial on the public site.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

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
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {submitLabel || (mode === 'create' ? 'Create Testimonial' : 'Save Changes')}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
