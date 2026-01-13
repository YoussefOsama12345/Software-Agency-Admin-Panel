'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Folder, Trash, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

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
import { Card, CardContent } from '@/components/ui/card';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createCategorySchema, CreateCategoryFormData } from '@/schemas/category.schema';

interface CategoryFormProps {
    defaultValues?: Partial<CreateCategoryFormData>;
    onSubmit: (data: CreateCategoryFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
    isLoading?: boolean;
    isFormSubmitting?: boolean;
    submitLabel?: string;
    headerTitle: string;
    headerDescription: string;
    mode?: 'create' | 'edit';
}

export function CategoryForm({
    defaultValues,
    onSubmit,
    isLoading = false,
    isFormSubmitting,
    onDelete,
    submitLabel,
    mode = 'create',
    headerTitle,
    headerDescription
}: CategoryFormProps) {

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
        language: (defaultValues?.language as "en" | "ar") || 'en',
    };

    const form = useForm({
        resolver: zodResolver(createCategorySchema),
        defaultValues: initialValues,
    });

    const handleSubmit = async (data: CreateCategoryFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Failed to save category');
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
            toast.error('Failed to delete category');
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
                <CardContent>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                                                            placeholder="e.g. Technology"
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
                                                            placeholder="مثال: تكنولوجيا"
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
                                                        placeholder={lang === 'ar' ? 'مثال: تكنولوجيا' : 'e.g. technology'}
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
                                                        placeholder="Short description of the category..."
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
                                                        placeholder="وصف قصير للفئة..."
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
                                                <FormLabel>Image URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/image.jpg" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {form.watch('image') && (
                                        <div className="aspect-video relative rounded-md overflow-hidden border bg-muted mt-2">
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

                                {lang === 'en' ? (
                                    <FormField
                                        control={form.control}
                                        name="metaDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Meta Description (English)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="SEO Description"
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
                                                        placeholder="وصف SEO"
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
                                    title="Delete Category"
                                    description="Are you sure you want to delete this category? This action cannot be undone."
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
                            <Button type="submit" disabled={isLoading || isDeleting || isFormSubmitting}>
                                {isLoading || isFormSubmitting ? (
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
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}
