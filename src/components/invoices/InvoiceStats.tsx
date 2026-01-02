import { DollarSign, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

export function InvoiceStats() {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Invoiced"
                value="$48,250.00"
                subtitle="+12% from last month"
                icon={DollarSign}
                color="blue"
            />
            <StatsCard
                title="Paid"
                value="$32,400.00"
                subtitle="Total payments received"
                icon={CheckCircle2}
                color="green"
            />
            <StatsCard
                title="Pending"
                value="$12,650.00"
                subtitle="Invoices awaiting payment"
                icon={Clock}
                color="purple"
            />
            <StatsCard
                title="Overdue"
                value="$3,200.00"
                subtitle="-5% from last month"
                icon={AlertCircle}
                color="orange"
            />
        </StatsGrid>
    );
}
