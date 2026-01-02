'use client';

import Link from 'next/link';
import { Star, Edit, Trash2, Eye } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Testimonial } from './TestimonialList';

interface TestimonialTableProps {
    testimonials: Testimonial[];
    onDelete: (id: string) => void;
}

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function TestimonialTable({ testimonials, onDelete }: TestimonialTableProps) {
    if (testimonials.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p>No testimonials found</p>
                <p className="text-sm mt-1">Add your first client success story!</p>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {testimonials.map((testimonial) => (
                        <TableRow key={testimonial.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={testimonial.image} />
                                        <AvatarFallback>{getInitials(testimonial.clientName)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{testimonial.clientName}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="max-w-[300px]">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    "{testimonial.content}"
                                </p>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3.5 w-3.5 ${i < testimonial.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-muted-foreground/20"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={testimonial.isActive ? 'default' : 'secondary'}>
                                    {testimonial.isActive ? 'Active' : 'Hidden'}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/testimonials/${testimonial.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => onDelete(testimonial.id)}
                                        title={`Delete Testimonial from ${testimonial.clientName}?`}
                                        description="Are you sure you want to delete this testimonial? This action cannot be undone."
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
