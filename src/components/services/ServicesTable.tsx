'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import Link from 'next/link';
import { Service } from '@/schemas/service.schema';

interface ServicesTableProps {
    services: Service[];
}

export function ServicesTable({ services }: ServicesTableProps) {
    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No services found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        services.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell className="font-medium">{service.name}</TableCell>
                                <TableCell className="max-w-[300px] truncate text-muted-foreground">
                                    {service.description || '-'}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={service.status === 'ACTIVE' ? 'default' : 'secondary'}
                                    >
                                        {service.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-center gap-1">
                                        <Link href={`/services/${service.id}/edit`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <ConfirmDeleteModal
                                            onConfirm={() => {
                                                console.log('Delete service', service.id);
                                            }}
                                            title={`Delete Service ${service.name}?`}
                                            description="Are you sure you want to delete this service? This action cannot be undone."
                                            trigger={
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
