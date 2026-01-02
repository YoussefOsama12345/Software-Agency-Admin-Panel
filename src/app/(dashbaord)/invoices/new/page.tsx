'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Receipt, FileText, Target, ArrowUpRight, Lightbulb, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { FormPageHeader } from '@/components/common/FormPageHeader';
import { FormPageSidebar, Tip } from '@/components/common/FormPageSidebar';
import { FormCardHeader } from '@/components/common/FormCardHeader';
import { InvoiceFormData } from '@/schemas/invoice.schema';

const invoiceTips: Tip[] = [
    {
        icon: Target,
        title: 'Accuracy',
        description: 'Double-check client details and items for accuracy before sending.',
    },
    {
        icon: CreditCard,
        title: 'Payment Terms',
        description: 'Clearly state your payment terms (e.g., Net 30) in the notes.',
    },
    {
        icon: ArrowUpRight,
        title: 'Professionalism',
        description: 'Keep descriptions clear and professional.',
    },
];

export default function CreateInvoicePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: InvoiceFormData) => {
        setIsLoading(true);
        try {
            console.log('Creating invoice:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Invoice created successfully!');
            router.push('/invoices');
        } catch (error) {
            console.error('Error creating invoice:', error);
            toast.error('Failed to create invoice. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="create"
                title="Invoice"
                backHref="/invoices"
                icon={Receipt}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-start">
                <div className="lg:col-span-8">
                    <Card>
                        <FormCardHeader
                            title="Invoice Details"
                            description="Fill in the information to create a new invoice"
                            icon={FileText}
                        />
                        <CardContent>
                            <InvoiceForm
                                onSubmit={handleSubmit}
                                isSubmitting={isLoading}
                                mode="create"
                            />
                        </CardContent>
                    </Card>
                </div>

                <FormPageSidebar
                    title="Invoicing Tips"
                    description="Best practices for getting paid faster"
                    tips={invoiceTips}
                />
            </div>
        </div>
    );
}
