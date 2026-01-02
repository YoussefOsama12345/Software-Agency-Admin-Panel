import Link from 'next/link';
import { Edit, Trash2, Eye, Mail, Phone } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Define the shape of our client data
// In a real app, this would be imported from a shared types file
export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    industry: string;
    projectsCount: number;
    totalBudget: number;
    status: string;
}

interface ClientTableProps {
    clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
    return (
        <div className="border rounded-lg bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Projects</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow key={client.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border">
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {client.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Link href={`/clients/${client.id}`} className="font-medium hover:underline">
                                        {client.name}
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{client.email}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{client.phone}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="font-normal">
                                    {client.industry}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{client.projectsCount} Active</span>
                                    <span className="text-xs text-muted-foreground">
                                        ${client.totalBudget.toLocaleString()} Budget
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={client.status === 'Active' ? 'default' : 'secondary'}
                                    className={client.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : ''}
                                >
                                    {client.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" asChild>
                                        <Link href={`/clients/${client.id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/clients/${client.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => {
                                            console.log('Delete client', client.id);
                                        }}
                                        title={`Delete Client ${client.name}?`}
                                        description="Are you sure you want to delete this client? This action cannot be undone."
                                        trigger={
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
