'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, Plus, Trash2, CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { format } from 'date-fns';

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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { invoiceSchema, InvoiceFormData, INVOICE_STATUSES } from '@/schemas/invoice.schema';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const mockClients = [
    { id: '1', name: 'TechCorp Inc.' },
    { id: '2', name: 'FinanceHub' },
    { id: '3', name: 'MediCare+' },
];

const mockProjects = [
    { id: '1', name: 'Website Redesign' },
    { id: '2', name: 'Mobile App Development' },
    { id: '3', name: 'SEO Campaign' },
];

interface InvoiceFormProps {
    defaultValues?: Partial<InvoiceFormData>;
    onSubmit: (data: InvoiceFormData) => Promise<void>;
    isSubmitting?: boolean;
    mode?: 'create' | 'edit';
}

export function InvoiceForm({
    defaultValues,
    onSubmit,
    isSubmitting = false,
    mode = 'create',
}: InvoiceFormProps) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            invoiceNumber: defaultValues?.invoiceNumber || '',
            client: defaultValues?.client || '',
            project: defaultValues?.project || '',
            issueDate: defaultValues?.issueDate || new Date(),
            dueDate: defaultValues?.dueDate || new Date(),
            status: defaultValues?.status || 'DRAFT',
            notes: defaultValues?.notes || '',
            items: defaultValues?.items || [{ description: '', quantity: 1, price: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const watchItems = form.watch("items");
    const totalAmount = watchItems?.reduce((acc, item) => {
        return acc + (Number(item.quantity) * Number(item.price) || 0);
    }, 0) || 0;

    const handleSubmit = async (data: InvoiceFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Failed to save invoice');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Invoice Number */}
                    <FormField
                        control={form.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Invoice Number <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="INV-001" {...field} />
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
                                        {INVOICE_STATUSES.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Client */}
                    <FormField
                        control={form.control}
                        name="client"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Client Name <span className="text-destructive">*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder="Select a client" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {mockClients.map((client) => (
                                            <SelectItem key={client.id} value={client.name}>
                                                {client.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Project */}
                    <FormField
                        control={form.control}
                        name="project"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Project <span className="text-destructive">*</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder="Select a project" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {mockProjects.map((project) => (
                                            <SelectItem key={project.id} value={project.name}>
                                                {project.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Issue Date */}
                    <FormField
                        control={form.control}
                        name="issueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Issue Date</FormLabel>
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
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Due Date */}
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Due Date</FormLabel>
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
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <div className="space-y-4">
                    {/* Invoice Items Section */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                            <div className="grid grid-cols-12 gap-4 w-full pr-10">
                                <div className="col-span-6 text-sm font-medium text-muted-foreground">Description</div>
                                <div className="col-span-2 text-sm font-medium text-muted-foreground">Qty</div>
                                <div className="col-span-4 text-sm font-medium text-muted-foreground">Price</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <div key={field.id} className="relative grid grid-cols-12 gap-4 items-center group">
                                    <div className="col-span-6">
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <Input placeholder="Item description" {...field} className="bg-transparent" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.quantity`}
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            placeholder="1"
                                                            {...field}
                                                            value={field.value === 0 ? '' : field.value}
                                                            onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                                                            className="bg-transparent"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="col-span-4">
                                        <FormField
                                            control={form.control}
                                            name={`items.${index}.price`}
                                            render={({ field }) => (
                                                <FormItem className="space-y-0">
                                                    <FormControl>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                                            <Input
                                                                type="number"
                                                                min={0}
                                                                step="0.01"
                                                                placeholder="0.00"
                                                                className="pl-7 bg-transparent"
                                                                {...field}
                                                                value={field.value === 0 ? '' : field.value}
                                                                onChange={e => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-destructive h-8 w-8"
                                            onClick={() => remove(index)}
                                            disabled={fields.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80 px-0 hover:bg-transparent mt-2"
                            onClick={() => append({ description: '', quantity: 1, price: 0 })}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Line Item
                        </Button>
                    </div>

                    <div className="flex justify-end pt-6">
                        <div className="w-1/2 md:w-1/3 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold">
                                <span>Total</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-1">
                    {/* Notes */}
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Add any additional notes, payment terms, or thank you messages..."
                                        className="resize-none min-h-[100px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
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
                                {mode === 'create' ? 'Create Invoice' : 'Save Changes'}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form >
    );
}
