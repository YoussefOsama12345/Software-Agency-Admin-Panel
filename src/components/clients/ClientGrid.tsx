import { Client } from './ClientTable';
import { ClientCard } from './ClientCard';

interface ClientGridProps {
    clients: Client[];
}

export function ClientGrid({ clients }: ClientGridProps) {
    if (clients.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No clients found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or create a new client
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
            ))}
        </div>
    );
}
