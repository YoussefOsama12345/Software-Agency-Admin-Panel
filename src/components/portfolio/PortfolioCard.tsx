import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, ExternalLink } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

export interface PortfolioItem {
    id: string;
    title: string;
    description?: string;
    image: string;
    link?: string;
    createdAt: string;
    updatedAt: string;
}

interface PortfolioCardProps {
    item: PortfolioItem;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow h-full flex flex-col overflow-hidden group p-0 gap-0">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                {/*  Use a real image component or optimized Next.js Image here */}
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <CardHeader className="flex flex-row items-start justify-between p-3 pb-0">
                <div className="space-y-1 pr-2 w-full">
                    <Link href={`/portfolio/${item.id}/edit`} className="hover:underline block">
                        <h3 className="font-semibold line-clamp-1 truncate">{item.title}</h3>
                    </Link>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/portfolio/${item.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Project
                            </Link>
                        </DropdownMenuItem>
                        {item.link && (
                            <DropdownMenuItem asChild>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Live
                                </a>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete portfolio item', item.id);
                            }}
                            title={`Delete ${item.title}?`}
                            description="Are you sure you want to delete this project? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Project
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-3 pt-2">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {item.description}
                </p>

                {item.link && (
                    <div className="mt-auto pt-2">
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                            <ExternalLink className="h-3 w-3" />
                            {new URL(item.link).hostname}
                        </a>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
