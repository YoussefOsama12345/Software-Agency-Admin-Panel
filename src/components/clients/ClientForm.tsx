'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Mail, Phone } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { createClientSchema, CreateClientFormData } from '@/schemas/client.schema';

interface ClientFormProps {
    defaultValues?: Partial<CreateClientFormData>;
    onSubmit: (data: CreateClientFormData) => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
}

export function ClientForm({
    defaultValues,
    onSubmit,
    isLoading = false,
    submitLabel = 'Create Client'
}: ClientFormProps) {
    const router = useRouter();

    const form = useForm<CreateClientFormData>({
        resolver: zodResolver(createClientSchema),
        defaultValues: {
            name: defaultValues?.name || '',
            email: defaultValues?.email || '',
            phone: defaultValues?.phone || '',
            industry: defaultValues?.industry || '',
        },
    });

    const handleSubmit = async (data: CreateClientFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Enter company name"
                                        className="pl-9"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email & Phone Row */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="contact@company.com"
                                            className="pl-9"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="+1 (555) 000-0000"
                                            className="pl-9"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Industry */}
                <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. Technology, Healthcare, Finance"
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" disabled={isLoading} onClick={() => router.back()}>
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
