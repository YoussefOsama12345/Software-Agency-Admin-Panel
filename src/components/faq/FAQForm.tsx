'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { CreateFaqFormData, createFaqSchema } from '@/schemas/faq.schema';

interface FAQFormProps {
    defaultValues?: Partial<CreateFaqFormData>;
    isEditing?: boolean;
    onSubmit?: (data: CreateFaqFormData) => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
    headerTitle?: string;
    headerDescription?: string;
}

// Mock categories - replace with actual API call
const categories = [
    { id: '3f2a9c1e-6b7d-4e8a-9f21-5c7b8a6d1e42', name: 'General', name_ar: 'عام' },
    { id: 'a7c4e2b9-1f8d-4a91-9b5e-6d2f1e7a8c40', name: 'Billing', name_ar: 'الفواتير' },
    { id: '5e1c8a2b-9d6f-4b7e-8a3c-2f7d1e6b9c54', name: 'Account', name_ar: 'الحساب' },
    { id: '9b7e2f1c-4a6d-4c8b-8e5a-3d1f6b9c2a70', name: 'Support', name_ar: 'الدعم' },
    { id: 'c8a6b1d5-7e2f-4c9a-8b3d-1f9e6a2c4b80', name: 'Technical', name_ar: 'تقني' },
];

export function FAQForm({
    defaultValues,
    isEditing = false,
    onSubmit,
    isLoading = false,
    submitLabel,
    headerTitle = 'FAQ Details',
    headerDescription = 'Manage FAQ information'
}: FAQFormProps) {
    const router = useRouter();
    const [isInternalSubmitting, setIsInternalSubmitting] = useState(false);
    const isSubmitting = isLoading || isInternalSubmitting;

    const form = useForm({
        resolver: zodResolver(createFaqSchema),
        defaultValues: {
            question: defaultValues?.question || '',
            question_ar: defaultValues?.question_ar || '',
            answer: defaultValues?.answer || '',
            answer_ar: defaultValues?.answer_ar || '',
            categoryId: defaultValues?.categoryId || '',
            status: (defaultValues?.status || 'PUBLISHED') as "PUBLISHED" | "DRAFT",
            order: defaultValues?.order || 0,
            language: (defaultValues?.language as "en" | "ar") || 'en',
        },
    });

    const handleSubmit = async (data: CreateFaqFormData) => {
        if (onSubmit) {
            await onSubmit(data);
            return;
        }

        setIsInternalSubmitting(true);
        try {
            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log('Submitted data:', data);

            toast.success(isEditing ? 'FAQ updated successfully' : 'FAQ created successfully');
            router.push('/faq');
            router.refresh();
        } catch (error) {
            console.error('Error saving FAQ:', error);
            toast.error('Failed to save FAQ');
        } finally {
            setIsInternalSubmitting(false);
        }
    };

    const [lang, setLang] = useState<'en' | 'ar'>('en');

    return (
        <Form {...form}>
            <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                <FormCardHeader
                    title={headerTitle}
                    description={headerDescription}
                    icon={HelpCircle}
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
                        {/* Question */}
                        {lang === 'en' ? (
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question (English)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., How do I reset my password?" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The main question that users will see.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField
                                control={form.control}
                                name="question_ar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question (Arabic)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="مثال: كيف أعيد تعيين كلمة المرور؟"
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

                        {/* Answer */}
                        {lang === 'en' ? (
                            <FormField
                                control={form.control}
                                name="answer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Answer (English)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Provide a detailed answer..."
                                                className="min-h-[120px]"
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
                                name="answer_ar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Answer (Arabic)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="قدم إجابة مفصلة..."
                                                className="min-h-[120px] text-right"
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

                        {/* Category */}
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{lang === 'ar' ? 'الفئة' : 'Category'}</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                    >
                                        <FormControl>
                                            <SelectTrigger className={`w-full ${lang === 'ar' ? 'text-right' : ''}`}>
                                                <SelectValue placeholder={lang === 'ar' ? 'اختر فئة' : 'Select a category'} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
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

                        {/* Status */}
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
                                            <SelectItem value="PUBLISHED" className={lang === 'ar' ? 'text-right' : ''}>
                                                {lang === 'ar' ? 'منشور' : 'Published'}
                                            </SelectItem>
                                            <SelectItem value="DRAFT" className={lang === 'ar' ? 'text-right' : ''}>
                                                {lang === 'ar' ? 'مسودة' : 'Draft'}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Order */}
                        <FormField
                            control={form.control}
                            name="order"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Order</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Lower numbers appear first.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-end gap-4">
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
                                        {submitLabel || (isEditing ? 'Update FAQ' : 'Create FAQ')}
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
