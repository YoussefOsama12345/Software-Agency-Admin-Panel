import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, Eye, Mail, Phone, Building2, Briefcase, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Client } from './ClientTable';

interface ClientCardProps {
    client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {client.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <Link href={`/clients/${client.id}`} className="hover:underline">
                            <h3 className="font-semibold truncate">{client.name}</h3>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-normal text-xs">
                                {client.industry}
                            </Badge>
                        </div>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/clients/${client.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/clients/${client.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Client
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete client', client.id);
                            }}
                            title={`Delete Client ${client.name}?`}
                            description="Are you sure you want to delete this client? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Client
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{client.phone}</span>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" />
                            Projects
                        </p>
                        <p className="font-medium">{client.projectsCount} Active</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5" />
                            Budget
                        </p>
                        <p className="font-medium">${client.totalBudget.toLocaleString()}</p>
                    </div>
                </div>

                {/* Status Footer-like section */}
                <div className="pt-2 border-t flex justify-between items-center">
                    <Badge
                        variant={client.status === 'Active' ? 'default' : 'secondary'}
                        className={client.status === 'Active' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                        {client.status}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
