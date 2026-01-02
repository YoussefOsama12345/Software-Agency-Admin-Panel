'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

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
import { expenseCategorySchema, ExpenseCategoryFormData, EXPENSE_CATEGORY_STATUSES } from '@/schemas/expense-category.schema';

interface ExpenseCategoryFormProps {
    defaultValues?: Partial<ExpenseCategoryFormData>;
    onSubmit: (data: ExpenseCategoryFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
    isSubmitting?: boolean;
    mode?: 'create' | 'edit';
}

export function ExpenseCategoryForm({
    defaultValues,
    onSubmit,
    onDelete,
    isSubmitting = false,
    mode = 'create',
}: ExpenseCategoryFormProps) {
    const router = useRouter();

    const form = useForm<ExpenseCategoryFormData>({
        resolver: zodResolver(expenseCategorySchema),
        defaultValues: {
            name: defaultValues?.name || '',
            description: defaultValues?.description || '',
            status: defaultValues?.status || 'ACTIVE',
        },
    });

    const handleSubmit = async (data: ExpenseCategoryFormData) => {
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Software, Travel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add details about this category..."
                                    className="resize-none min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
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
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {EXPENSE_CATEGORY_STATUSES.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Controls visibility in expense forms.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-3 pt-4">
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
            </form>
        </Form >
    );
}
