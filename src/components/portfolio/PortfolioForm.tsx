'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRef, useState } from 'react';
import { Briefcase, Loader2, Trash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { LanguageEnum, LanguageType } from '@/schemas/shared.schema';
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
import { CreatePortfolioFormData, createPortfolioSchema } from '@/schemas/portofolio.schema';
import { RichTextEditor } from '@/components/common/editor/RichTextEditor';

interface PortfolioFormProps {
    defaultValues?: Partial<CreatePortfolioFormData>;
    onSubmit: (data: CreatePortfolioFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
    isLoading?: boolean;
    headerTitle?: string;
    headerDescription?: string;
}

export function PortfolioForm({
    defaultValues,
    onSubmit,
    onDelete,
    isLoading = false,
    headerTitle,
    headerDescription,
}: PortfolioFormProps) {
    const form = useForm<CreatePortfolioFormData>({
        resolver: zodResolver(createPortfolioSchema),
        defaultValues: {
            title: defaultValues?.title || '',
            title_ar: defaultValues?.title_ar || '',
            description: defaultValues?.description || '',
            description_ar: defaultValues?.description_ar || '',
            image: defaultValues?.image || '',
            link: defaultValues?.link || '',
            language: (defaultValues?.language as LanguageType) || 'en',
        },
    });

    const handleSubmit = async (data: CreatePortfolioFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    const [lang, setLang] = useState<'en' | 'ar'>('en');

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!onDelete) return;
        setIsDeleting(true);
        try {
            await onDelete();
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Card>
                    <FormCardHeader
                        title={headerTitle || 'Portfolio Details'}
                        description={headerDescription || 'Provide details about your project.'}
                        icon={Briefcase}
                    >
                        <div>
                            <Select
                                value={lang}
                                onValueChange={(v: 'en' | 'ar') => setLang(v)}
                            >
                                <SelectTrigger className="w-[100px] bg-background">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="ar">Arabic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </FormCardHeader>
                    <CardContent className="space-y-6">
                        {/* Title */}
                        {lang === 'en' ? (
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Title (English) *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., E-Commerce Platform"
                                                {...field}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The name of the project as it will appear in the portfolio.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField
                                control={form.control}
                                name="title_ar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Title (Arabic)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="مثال: منصة التجارة الإلكترونية"
                                                className="text-right"
                                                dir="rtl"
                                                {...field}
                                                value={field.value || ''}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* Description */}
                        {lang === 'en' ? (
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (English)</FormLabel>
                                        <FormControl>
                                            <RichTextEditor
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Describe the project, technologies used, and key features..."
                                                dir="ltr"
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField
                                control={form.control}
                                name="description_ar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (Arabic)</FormLabel>
                                        <FormControl>
                                            <RichTextEditor
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                placeholder="وصف المشروع، التقنيات المستخدمة، والميزات الرئيسية..."
                                                dir="rtl"
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* Image URL */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Image URL *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://example.com/image.jpg"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        URL to the main showcase image.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Project Link */}
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://example.com"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Link to the live project (optional).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-3">
                            {onDelete && (
                                <ConfirmDeleteModal
                                    trigger={
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            disabled={isDeleting || isLoading}
                                        >
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    }
                                    onConfirm={handleDelete}
                                    isDeleting={isDeleting}
                                    title="Delete Project"
                                    description="Are you sure you want to delete this project? This action cannot be undone."
                                />
                            )}
                            <Button type="submit" disabled={isLoading || isDeleting}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {defaultValues ? 'Update Project' : 'Create Project'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
