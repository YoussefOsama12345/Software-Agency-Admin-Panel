'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Receipt, FileText, Target, ArrowUpRight, CreditCard } from 'lucide-react';
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
        title: 'Review',
        description: 'Review invoice details before marking as sent.',
    },
    {
        icon: CreditCard,
        title: 'Follow Up',
        description: 'If an invoice is overdue, send a polite reminder.',
    },
    {
        icon: ArrowUpRight,
        title: 'Records',
        description: 'Keep records of all changes made to an invoice.',
    },
];

import { MOCK_INVOICES } from '@/lib/mock-data';

export default function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = React.use(params);
    const [isLoading, setIsLoading] = useState(false);
    const [initialData, setInitialData] = useState<InvoiceFormData | undefined>(undefined);

    // Simulate fetching data
    useEffect(() => {
        const fetchInvoice = async () => {
            console.log('Fetching invoice with ID:', id);
            await new Promise(resolve => setTimeout(resolve, 800));

            const invoice = MOCK_INVOICES.find(inv => inv.id === id);

            if (invoice) {
                // Ensure type compatibility by spreading and removing id/totalAmount if necessary, 
                // though Invoice extends InvoiceFormData so it should be fine.
                setInitialData(invoice);
            } else {
                toast.error('Invoice not found');
                router.push('/invoices');
            }
        };

        fetchInvoice();
    }, [id, router]);

    const handleSubmit = async (data: InvoiceFormData) => {
        setIsLoading(true);
        try {
            console.log('Updating invoice:', data);
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Invoice updated successfully!');
            router.push('/invoices');
        } catch (error) {
            console.error('Error updating invoice:', error);
            toast.error('Failed to update invoice. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!initialData) {
        return <div>Loading...</div>; // Replace with Skeleton
    }

    return (
        <div className="space-y-6">
            <FormPageHeader
                mode="edit"
                title="Invoice"
                backHref="/invoices"
                icon={Receipt}
            />

            <div className="grid gap-6 lg:grid-cols-12 items-start">
                <div className="lg:col-span-8">
                    <Card>
                        <FormCardHeader
                            title="Invoice Details"
                            description="Update the information for this invoice"
                            icon={FileText}
                        />
                        <CardContent>
                            <InvoiceForm
                                defaultValues={initialData}
                                onSubmit={handleSubmit}
                                isSubmitting={isLoading}
                                mode="edit"
                            />
                        </CardContent>
                    </Card>
                </div>

                <FormPageSidebar
                    title="Editing Tips"
                    description="Best practices for managing invoices"
                    tips={invoiceTips}
                />
            </div>
        </div>
    );
}
