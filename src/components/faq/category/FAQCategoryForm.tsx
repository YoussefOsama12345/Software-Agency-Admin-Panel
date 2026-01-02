'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, Folder } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { createCategorySchema, CreateCategoryFormData } from '@/schemas/category.schema';

interface FAQCategoryFormProps {
    defaultValues?: Partial<CreateCategoryFormData>;
    onSubmit: (data: CreateCategoryFormData) => Promise<void>;
    isSubmitting?: boolean;
    mode?: 'create' | 'edit';
    headerTitle?: string;
    headerDescription?: string;
}

export function FAQCategoryForm({
    defaultValues,
    onSubmit,
    isSubmitting = false,
    mode = 'create',
    headerTitle = 'Category Details',
    headerDescription = 'Manage FAQ category information'
}: FAQCategoryFormProps) {
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
                                                            placeholder="e.g. Account Support"
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
                                                            placeholder="مثال: دعم الحساب"
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
                                                        placeholder={lang === 'ar' ? 'مثال: دعم-الحساب' : 'e.g. account-support'}
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
                                                        placeholder="Description of this FAQ category..."
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
                                                        placeholder="وصف لفئة الأسئلة الشائعة..."
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
                                                <FormLabel>Icon/Image URL (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/icon.png" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {form.watch('image') && (
                                        <div className="aspect-video relative rounded-md overflow-hidden border bg-muted mt-2 max-w-[200px]">
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
                                                    <Input placeholder="SEO Title for FAQ Category" {...field} />
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
                                                        placeholder="عنوان SEO لفئة الأسئلة"
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
                                                        placeholder="SEO Description for FAQ Category"
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
                                                        placeholder="وصف SEO لفئة الأسئلة"
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
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        {mode === 'create' ? 'Create FAQ Category' : 'Save Changes'}
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
