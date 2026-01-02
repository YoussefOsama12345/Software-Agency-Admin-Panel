'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Loader2, Save, Upload, Plus, X, Trash, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useState } from 'react';

import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { createArticleSchema, CreateArticleFormData, ArticleStatusEnum, LanguageEnum } from '@/schemas/article.schema';

// Mock categories for now - replace with actual data fetching
const mockCategories = [
    { id: 'c1f2a7e4-9b8a-4e6a-b1f3-2c6a5e7f1d21', name: 'Technology', name_ar: 'تكنولوجيا' },
    { id: 'a3e9d8c4-1f2b-4a91-8c7d-6e5f9b2a1c34', name: 'Design', name_ar: 'تصميم' },
    { id: 'f7c2a9e1-5b8d-4e3c-9a21-4d6e8b7c5f90', name: 'Business', name_ar: 'أعمال' },
    { id: '9d4e7c1b-2f8a-4b5e-8c6a-3f1e9d2b7a45', name: 'Lifestyle', name_ar: 'نمط حياة' },
];

interface ArticleFormProps {
    defaultValues?: Partial<CreateArticleFormData>;
    onSubmit: (data: CreateArticleFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
    headerTitle: string;
    headerDescription: string;
    mode?: 'create' | 'edit';
}

export function ArticleForm({
    defaultValues,
    onSubmit,
    onDelete,
    isLoading = false,
    submitLabel = 'Save Article',
    headerTitle,
    headerDescription,
    mode = 'create'
}: ArticleFormProps) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(createArticleSchema),
        defaultValues: {
            title: defaultValues?.title || '',
            title_ar: defaultValues?.title_ar || '',
            slug: defaultValues?.slug || '',
            description: defaultValues?.description || '',
            description_ar: defaultValues?.description_ar || '',
            content: defaultValues?.content || '',
            content_ar: defaultValues?.content_ar || '',
            image: defaultValues?.image || '',
            status: defaultValues?.status || 'DRAFT',
            language: (defaultValues?.language as "en" | "ar") || 'en',
            categoryId: defaultValues?.categoryId || '',
            tags: defaultValues?.tags || [],
            metaTitle: defaultValues?.metaTitle || '',
            metaTitle_ar: defaultValues?.metaTitle_ar || '',
            metaDescription: defaultValues?.metaDescription || '',
            metaDescription_ar: defaultValues?.metaDescription_ar || '',
            canonicalUrl: defaultValues?.canonicalUrl || '',
            noIndex: defaultValues?.noIndex || false,
            noFollow: defaultValues?.noFollow || false,
            ogTitle: defaultValues?.ogTitle || '',
            ogTitle_ar: defaultValues?.ogTitle_ar || '',
            ogDescription: defaultValues?.ogDescription || '',
            ogDescription_ar: defaultValues?.ogDescription_ar || '',
            ogImage: defaultValues?.ogImage || '',
            twitterTitle: defaultValues?.twitterTitle || '',
            twitterTitle_ar: defaultValues?.twitterTitle_ar || '',
            twitterDescription: defaultValues?.twitterDescription || '',
            twitterDescription_ar: defaultValues?.twitterDescription_ar || '',
            twitterImage: defaultValues?.twitterImage || '',
        },
    });

    const handleSubmit = async (data: CreateArticleFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Failed to save article');
        }
    };

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!onDelete) return;
        setIsDeleting(true);
        try {
            await onDelete();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete article');
        } finally {
            setIsDeleting(false);
        }
    };

    const [lang, setLang] = useState<'en' | 'ar'>('en');

    return (
        <Form {...form}>
            <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                <FormCardHeader
                    title={headerTitle}
                    description={headerDescription}
                    icon={FileText}
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
                <CardContent>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="general">General</TabsTrigger>
                                <TabsTrigger value="seo">SEO</TabsTrigger>
                                <TabsTrigger value="social">Social Media</TabsTrigger>
                            </TabsList>

                            {/* General Tab */}
                            <TabsContent value="general" className="space-y-6 mt-6">
                                <Card className="border-0 shadow-none">
                                    <CardContent className="pt-6 space-y-6">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {lang === 'en' ? (
                                                <FormField
                                                    control={form.control}
                                                    name="title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Title (English) *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Article title"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        if (mode === 'create') {
                                                                            const slug = e.target.value
                                                                                .toLowerCase()
                                                                                .replace(/[^a-z0-9]+/g, '-')
                                                                                .replace(/^-+|-+$/g, '');
                                                                            form.setValue('slug', slug, { shouldValidate: true });
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
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
                                                            <FormLabel>Title (Arabic)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="عنوان المقال"
                                                                    className="text-right"
                                                                    dir="rtl"
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                            <FormField
                                                control={form.control}
                                                name="slug"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Slug</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Leave empty to auto-generate from title." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {lang === 'en' ? (
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Description (English) *</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Short description for lists and previews" className="h-20" {...field} />
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
                                                            <Textarea
                                                                placeholder="وصف قصير للمقال"
                                                                className="h-20 text-right"
                                                                dir="rtl"
                                                                {...field}
                                                                value={field.value || ''}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        {lang === 'en' ? (
                                            <FormField
                                                control={form.control}
                                                name="content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Content (English) *</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Write your article content here..." className="min-h-[300px] font-mono" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ) : (
                                            <FormField
                                                control={form.control}
                                                name="content_ar"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Content (Arabic)</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="اكتب محتوى المقال هنا..."
                                                                className="min-h-[300px] font-mono text-right"
                                                                dir="rtl"
                                                                {...field}
                                                                value={field.value || ''}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        <div className="grid gap-6 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="categoryId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{lang === 'ar' ? 'الفئة' : 'Category'} *</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className={`w-full ${lang === 'ar' ? 'text-right' : ''}`}>
                                                                    <SelectValue placeholder={lang === 'ar' ? 'اختر فئة' : 'Select category'} />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {mockCategories.map((category) => (
                                                                    <SelectItem key={category.id} value={category.id} className={lang === 'ar' ? 'text-right' : ''}>
                                                                        {lang === 'ar' ? category.name_ar : category.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{lang === 'ar' ? 'الحالة' : 'Status'}</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className={`w-full ${lang === 'ar' ? 'text-right' : ''}`}>
                                                                    <SelectValue placeholder={lang === 'ar' ? 'اختر الحالة' : 'Select status'} />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="DRAFT" className={lang === 'ar' ? 'text-right' : ''}>
                                                                    {lang === 'ar' ? 'مسودة' : 'Draft'}
                                                                </SelectItem>
                                                                <SelectItem value="PUBLISHED" className={lang === 'ar' ? 'text-right' : ''}>
                                                                    {lang === 'ar' ? 'منشور' : 'Published'}
                                                                </SelectItem>
                                                                <SelectItem value="ARCHIVED" className={lang === 'ar' ? 'text-right' : ''}>
                                                                    {lang === 'ar' ? 'مؤرشف' : 'Archived'}
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Featured Image URL *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* SEO Tab */}
                            <TabsContent value="seo" className="space-y-6 mt-6">
                                <Card className="border-0 shadow-none">
                                    <CardContent className="pt-6 space-y-6">
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {lang === 'en' ? (
                                                <FormField
                                                    control={form.control}
                                                    name="metaTitle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Meta Title (English)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="SEO Title" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            ) : (
                                                <FormField
                                                    control={form.control}
                                                    name="metaTitle_ar"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Meta Title (Arabic)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="عنوان SEO"
                                                                    className="text-right"
                                                                    dir="rtl"
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                            <FormField
                                                control={form.control}
                                                name="canonicalUrl"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Canonical URL</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="https://..." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {lang === 'en' ? (
                                            <FormField
                                                control={form.control}
                                                name="metaDescription"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Meta Description (English)</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="SEO Description" className="h-20" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ) : (
                                            <FormField
                                                control={form.control}
                                                name="metaDescription_ar"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Meta Description (Arabic)</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="وصف SEO"
                                                                className="h-20 text-right"
                                                                dir="rtl"
                                                                {...field}
                                                                value={field.value || ''}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        <div className="flex gap-8">
                                            <FormField
                                                control={form.control}
                                                name="noIndex"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                                        <FormControl>
                                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                        <div className="space-y-0.5">
                                                            <FormLabel>No Index</FormLabel>
                                                            <FormDescription>Tell search engines not to index this page.</FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="noFollow"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                                        <FormControl>
                                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                        <div className="space-y-0.5">
                                                            <FormLabel>No Follow</FormLabel>
                                                            <FormDescription>Tell search engines not to follow links.</FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Social Tab */}
                            <TabsContent value="social" className="space-y-6 mt-6">
                                <Card className="border-0 shadow-none">
                                    <CardContent className="pt-6 space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Open Graph (Facebook / LinkedIn)</h3>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                {lang === 'en' ? (
                                                    <FormField
                                                        control={form.control}
                                                        name="ogTitle"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>OG Title (English)</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="OG Title" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                ) : (
                                                    <FormField
                                                        control={form.control}
                                                        name="ogTitle_ar"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>OG Title (Arabic)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="عنوان OG"
                                                                        className="text-right"
                                                                        dir="rtl"
                                                                        {...field}
                                                                        value={field.value || ''}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}
                                                <FormField
                                                    control={form.control}
                                                    name="ogImage"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>OG Image URL</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="https://..." {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            {lang === 'en' ? (
                                                <FormField
                                                    control={form.control}
                                                    name="ogDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>OG Description (English)</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="OG Description" className="h-20" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            ) : (
                                                <FormField
                                                    control={form.control}
                                                    name="ogDescription_ar"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>OG Description (Arabic)</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="وصف OG"
                                                                    className="h-20 text-right"
                                                                    dir="rtl"
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Twitter Card</h3>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                {lang === 'en' ? (
                                                    <FormField
                                                        control={form.control}
                                                        name="twitterTitle"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Twitter Title (English)</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Twitter Title" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                ) : (
                                                    <FormField
                                                        control={form.control}
                                                        name="twitterTitle_ar"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Twitter Title (Arabic)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="عنوان تويتر"
                                                                        className="text-right"
                                                                        dir="rtl"
                                                                        {...field}
                                                                        value={field.value || ''}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}
                                                <FormField
                                                    control={form.control}
                                                    name="twitterImage"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Twitter Image URL</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="https://..." {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            {lang === 'en' ? (
                                                <FormField
                                                    control={form.control}
                                                    name="twitterDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Twitter Description (English)</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Twitter Description" className="h-20" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            ) : (
                                                <FormField
                                                    control={form.control}
                                                    name="twitterDescription_ar"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Twitter Description (Arabic)</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="وصف تويتر"
                                                                    className="h-20 text-right"
                                                                    dir="rtl"
                                                                    {...field}
                                                                    value={field.value || ''}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-end gap-3 pt-4">
                            {mode === 'edit' && onDelete && (
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
                                    title="Delete Article"
                                    description="Are you sure you want to delete this article? This action cannot be undone."
                                />
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isLoading || isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading || isDeleting}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {submitLabel}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}
