'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Folder } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { LanguageType } from '@/schemas/shared.schema';
import { createCategorySchema, CreateCategoryFormData } from '@/schemas/category.schema';

interface PortfolioCategoryFormProps {
    defaultValues?: Partial<CreateCategoryFormData>;
    onSubmit: (data: CreateCategoryFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
    isSubmitting?: boolean;
    mode?: 'create' | 'edit';
    headerTitle?: string;
    headerDescription?: string;
}

export function PortfolioCategoryForm({
    defaultValues,
    onSubmit,
    onDelete,
    isSubmitting = false,
    mode = 'create',
    headerTitle,
    headerDescription,
}: PortfolioCategoryFormProps) {
    const router = useRouter();

    const initialValues: CreateCategoryFormData = {
        name: defaultValues?.name || '',
        name_ar: defaultValues?.name_ar || '',
        slug: defaultValues?.slug || '',
        description: defaultValues?.description || '',
        description_ar: defaultValues?.description_ar || '',
        image: defaultValues?.image || '',
        status: (defaultValues?.status as 'ACTIVE' | 'INACTIVE') || 'ACTIVE',
        metaTitle: defaultValues?.metaTitle || '',
        metaTitle_ar: defaultValues?.metaTitle_ar || '',
        metaDescription: defaultValues?.metaDescription || '',
        metaDescription_ar: defaultValues?.metaDescription_ar || '',
        language: (defaultValues?.language as LanguageType) || 'en',
    };

    const form = useForm({
        resolver: zodResolver(createCategorySchema),
        defaultValues: initialValues,
    });

    const [isDeleting, setIsDeleting] = useState(false);
    const [lang, setLang] = useState<'en' | 'ar'>('en');

    const handleSubmit = async (data: CreateCategoryFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Failed to save category');
        }
    };

    const handleDelete = async () => {
        if (!onDelete) return;
        setIsDeleting(true);
        try {
            await onDelete();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete category');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <Card>
                    <FormCardHeader
                        title={headerTitle || 'Category Details'}
                        description={headerDescription || 'Provide details about your category.'}
                        icon={Folder}
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
                        <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="general">General</TabsTrigger>
                                <TabsTrigger value="seo">SEO</TabsTrigger>
                            </TabsList>

                            {/* General Tab */}
                            <TabsContent value="general" className="space-y-6 mt-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    {lang === 'en' ? (
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name (English) <span className="text-destructive">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="e.g. Web Development"
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
                                            name="name_ar"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name (Arabic)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="مثال: تطوير الويب"
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
                                                <FormLabel>{lang === 'ar' ? 'Slug (Arabic)' : 'Slug (English)'}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={lang === 'ar' ? 'مثال: تطوير-الويب' : 'e.g. web-development'}
                                                        className={lang === 'ar' ? 'text-right' : ''}
                                                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                                        {...field}
                                                    />
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
                                                <FormLabel>Description (English)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Description of this portfolio category..."
                                                        className="h-32 resize-none"
                                                        {...field}
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
                                                    <Textarea
                                                        placeholder="وصف لفئة المعرض..."
                                                        className="h-32 resize-none text-right"
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
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{lang === 'ar' ? 'Status (Arabic)' : 'Status (English)'}</FormLabel>
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
                                                    <SelectItem value="ACTIVE" className={lang === 'ar' ? 'text-right' : ''}>
                                                        {lang === 'ar' ? 'نشط' : 'Active'}
                                                    </SelectItem>
                                                    <SelectItem value="INACTIVE" className={lang === 'ar' ? 'text-right' : ''}>
                                                        {lang === 'ar' ? 'غير نشط' : 'Inactive'}
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cover Image URL (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/cover.jpg" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {form.watch('image') && (
                                        <div className="aspect-video relative rounded-md overflow-hidden border bg-muted mt-2 max-w-[300px]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={form.watch('image')}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            {/* SEO Tab */}
                            <TabsContent value="seo" className="space-y-6 mt-6">
                                {lang === 'en' ? (
                                    <FormField
                                        control={form.control}
                                        name="metaTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Title (English)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="SEO Title for Portfolio Category" {...field} />
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
                                                        placeholder="عنوان SEO لفئة المعرض"
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

                                {lang === 'en' ? (
                                    <FormField
                                        control={form.control}
                                        name="metaDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Description (English)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="SEO Description for Portfolio Category"
                                                        className="h-24 resize-none"
                                                        {...field}
                                                    />
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
                                                        placeholder="وصف SEO لفئة المعرض"
                                                        className="h-24 resize-none text-right"
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
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-end gap-3">
                            {mode === 'edit' && onDelete && (
                                <ConfirmDeleteModal
                                    trigger={
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            disabled={isDeleting || isSubmitting}
                                        >
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    }
                                    onConfirm={handleDelete}
                                    isDeleting={isDeleting}
                                    title="Delete Category"
                                    description="Are you sure you want to delete this category? This action cannot be undone."
                                />
                            )}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isSubmitting || isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting || isDeleting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        {mode === 'create' ? 'Create Category' : 'Save Changes'}
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
