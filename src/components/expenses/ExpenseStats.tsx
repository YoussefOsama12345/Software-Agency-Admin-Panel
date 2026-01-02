'use client';

import { DollarSign, TrendingUp, Clock, Receipt } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

export function ExpenseStats() {
    return (
        <StatsGrid>
            <StatsCard
                title="Total Expenses"
                value="$12,450"
                subtitle="Current Month"
                icon={DollarSign}
                color="blue"
                className="border-0 shadow-sm"
            />
            <StatsCard
                title="Pending Approval"
                value="$3,200"
                subtitle="5 items pending"
                icon={Clock}
                color="orange"
                className="border-0 shadow-sm"
            />
            <StatsCard
                title="Average Expense"
                value="$450"
                subtitle="Per transaction"
                icon={TrendingUp}
                color="green"
                className="border-0 shadow-sm"
            />
            <StatsCard
                title="Receipts Missing"
                value="3"
                subtitle="Action required"
                icon={Receipt}
                color="red"
                className="border-0 shadow-sm"
            />
        </StatsGrid>
    );
}
