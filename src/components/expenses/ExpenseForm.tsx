'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Loader2, Save, Upload, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { format } from 'date-fns';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { expenseSchema, ExpenseFormData, EXPENSE_CATEGORIES, EXPENSE_STATUSES } from '@/schemas/expense.schema';

interface ExpenseFormProps {
    defaultValues?: Partial<ExpenseFormData>;
    onSubmit: (data: ExpenseFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
    isSubmitting?: boolean;
    mode?: 'create' | 'edit';
}

export function ExpenseForm({
    defaultValues,
    onSubmit,
    onDelete,
    isSubmitting = false,
    mode = 'create',
}: ExpenseFormProps) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            title: defaultValues?.title || '',
            amount: defaultValues?.amount || 0,
            date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
            category: defaultValues?.category || 'Office',
            description: defaultValues?.description || '',
            receipt: defaultValues?.receipt || '',
            status: defaultValues?.status || 'PENDING',
        },
    });

    const handleSubmit = async (data: ExpenseFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Failed to save expense');
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
            toast.error('Failed to delete expense');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expense Title <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Office Supplies, AWS Bill" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Amount */}
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="pl-7"
                                            {...field}
                                            value={(field.value as number) || ''}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category <span className="text-destructive">*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {EXPENSE_CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Date */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date <span className="text-destructive">*</span></FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Status */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {EXPENSE_STATUSES.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Current status of this expense claim.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add details about this expense..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Receipt Upload (Simulation) */}
                <div className="space-y-4">
                    <FormLabel>Receipt</FormLabel>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Click to upload receipt</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Supports: JPG, PNG, PDF (Max 5MB)
                        </p>
                        {form.watch('receipt') && (
                            <p className="text-xs text-primary mt-2 break-all">
                                Current: {form.watch('receipt')}
                            </p>
                        )}
                    </div>
                </div>

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
                            title="Delete Expense"
                            description="Are you sure you want to delete this expense? This action cannot be undone."
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
                                {mode === 'create' ? 'Create Expense' : 'Save Changes'}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
