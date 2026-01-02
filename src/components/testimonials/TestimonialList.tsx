'use client';

import Link from 'next/link';
import { Star, Edit, Trash2, Quote, User } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Testimonial {
    id: string;
    clientName: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image?: string;
    isActive: boolean;
    createdAt: string;
}

interface TestimonialListProps {
    testimonials: Testimonial[];
    onDelete: (id: string) => void;
}

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function TestimonialList({ testimonials, onDelete }: TestimonialListProps) {
    if (testimonials.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Quote className="h-12 w-12 mb-4 opacity-50" />
                <p>No testimonials found</p>
                <p className="text-sm mt-1">Add your first client success story!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className={cn("flex flex-col relative overflow-hidden transition-all hover:shadow-md", !testimonial.isActive && "opacity-75 bg-muted/30")}>
                    {!testimonial.isActive && (
                        <div className="absolute top-2 right-2 z-10">
                            <Badge variant="secondary">Hidden</Badge>
                        </div>
                    )}
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                        <Avatar className="h-10 w-10 border">
                            <AvatarImage src={testimonial.image} />
                            <AvatarFallback>{getInitials(testimonial.clientName)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <CardTitle className="text-base line-clamp-1">{testimonial.clientName}</CardTitle>
                            <CardDescription className="text-xs line-clamp-1">
                                {testimonial.role} at {testimonial.company}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <div className="flex mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "h-3.5 w-3.5",
                                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"
                                    )}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground italic line-clamp-4 relative">
                            <Quote className="h-3 w-3 inline mr-1 -mt-1 text-primary/40" />
                            {testimonial.content}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-0">
                        <Link href={`/testimonials/${testimonial.id}/edit`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                        </Link>
                        <ConfirmDeleteModal
                            onConfirm={() => onDelete(testimonial.id)}
                            title={`Delete Testimonial from ${testimonial.clientName}?`}
                            description="Are you sure you want to delete this testimonial? This action cannot be undone."
                            trigger={
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            }
                        />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
