'use client';

import Link from 'next/link';
import { MoreHorizontal, Pencil, Trash2, Briefcase, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Service } from '@/schemas/service.schema';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
    service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Card className="hover:shadow-md transition-all duration-300 group border shadow-sm bg-card hover:border-primary/50 flex flex-col h-full">
            <CardHeader className="p-4 pb-3 flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1.5 overflow-hidden">
                    <div className="flex items-center gap-2">
                        <Link href={`/services/${service.id}/edit`} className="font-bold text-lg hover:text-primary transition-colors truncate">
                            {service.name}
                        </Link>
                    </div>
                    <div>
                        <Badge variant={service.status === 'ACTIVE' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0 h-5 tracking-wide">
                            {service.status}
                        </Badge>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Link href={`/services/${service.id}/edit`} className="flex items-center w-full">
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete service', service.id);
                            }}
                            title={`Delete Service ${service.name}?`}
                            description="Are you sure you want to delete this service? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-1 flex-1">
                <div className="text-sm text-muted-foreground line-clamp-3 mt-2 min-h-[4rem]">
                    {service.description || 'No description provided.'}
                </div>
            </CardContent>
            <CardFooter className="p-2 px-4 flex justify-between items-center text-xs text-muted-foreground border-t bg-muted/20">
                <div className="flex items-center">
                    <span className="text-[10px] truncate max-w-[120px]">
                        Created {format(service.createdAt, 'MMM d, yyyy')}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Link href={`/services/${service.id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:text-primary">
                            <Pencil className="h-3.5 w-3.5" />
                        </Button>
                    </Link>

                </div>
            </CardFooter>
        </Card>
    );
}
