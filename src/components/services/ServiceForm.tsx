'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, Briefcase } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { FormCardHeader } from '@/components/common/FormCardHeader';

import { serviceSchema, ServiceFormData, SERVICE_STATUSES } from '@/schemas/service.schema';

interface ServiceFormProps {
    defaultValues?: Partial<ServiceFormData>;
    onSubmit: (data: ServiceFormData) => Promise<void>;
    isSubmitting?: boolean;
    mode?: 'create' | 'edit';
    headerTitle?: string;
    headerDescription?: string;
}

export function ServiceForm({
    defaultValues,
    onSubmit,
    isSubmitting = false,
    mode = 'create',
    headerTitle = 'Service Details',
    headerDescription = 'Manage service information'
}: ServiceFormProps) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            name_ar: defaultValues?.name_ar || '',
            description: defaultValues?.description || '',
            description_ar: defaultValues?.description_ar || '',
            status: defaultValues?.status || 'ACTIVE',
            language: (defaultValues?.language as "en" | "ar") || 'en',
        },
    });

    const handleSubmit = async (data: ServiceFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Failed to save service');
        }
    };

    const [lang, setLang] = useState<'en' | 'ar'>('en');

    return (
        <Form {...form}>
            <Card className="h-full border-2 border-dashed border-primary/20 bg-gradient-to-b from-background to-muted/20">
                <FormCardHeader
                    title={headerTitle}
                    description={headerDescription}
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
                <CardContent>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            {lang === 'en' ? (
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Service Name (English) <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Web Development" {...field} />
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
                                            <FormLabel>Service Name (Arabic)</FormLabel>
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

                            {lang === 'en' ? (
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description (English)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe the service..."
                                                    className="resize-none min-h-[100px]"
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
                                                    placeholder="وصف الخدمة..."
                                                    className="resize-none min-h-[100px] text-right"
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
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {SERVICE_STATUSES.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status.charAt(0) + status.slice(1).toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                                        {mode === 'create' ? 'Create Service' : 'Save Changes'}
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
