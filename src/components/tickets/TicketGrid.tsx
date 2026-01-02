import { Ticket } from '@/schemas/ticket.schema';
import { TicketCard } from './TicketCard';
import { Bug } from 'lucide-react';

interface TicketGridProps {
    tickets: Ticket[];
}

export function TicketGrid({ tickets }: TicketGridProps) {
    if (tickets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bug className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">No tickets found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or create a new ticket
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
}
