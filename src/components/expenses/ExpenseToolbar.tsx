'use client';

import { Search, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { EXPENSE_CATEGORIES, EXPENSE_STATUSES } from '@/schemas/expense.schema';

interface ExpenseToolbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    categoryFilter: string;
    onCategoryFilterChange: (category: string) => void;
    statusFilter: string;
    onStatusFilterChange: (status: string) => void;
    view: 'grid' | 'list';
    onViewChange: (view: 'grid' | 'list') => void;
}

export function ExpenseToolbar({
    searchQuery,
    onSearchChange,
    categoryFilter,
    onCategoryFilterChange,
    statusFilter,
    onStatusFilterChange,
    view,
    onViewChange
}: ExpenseToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search expenses..."
                        className="pl-8 w-full"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {EXPENSE_CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {EXPENSE_STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex items-center border rounded-md">
                    <Button
                        variant={view === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        className="h-8 px-2 rounded-r-none"
                        onClick={() => onViewChange('grid')}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-4" />
                    <Button
                        variant={view === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        className="h-8 px-2 rounded-l-none"
                        onClick={() => onViewChange('list')}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
