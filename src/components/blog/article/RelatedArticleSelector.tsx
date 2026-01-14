'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

// Mock data - replace with actual API call
const articles = [
    { id: '1', title: 'Getting Started with Next.js' },
    { id: '2', title: 'The Future of Web Development' },
    { id: '3', title: 'Understanding React Server Components' },
    { id: '4', title: 'Tailwind CSS Best Practices' },
    { id: '5', title: 'TypeScript for Beginners' },
];

interface RelatedArticleSelectorProps {
    value?: string[];
    onChange: (value: string[]) => void;
}

export function RelatedArticleSelector({
    value = [],
    onChange,
}: RelatedArticleSelectorProps) {
    const [open, setOpen] = React.useState(false);

    const selectedArticles = articles.filter((article) => value.includes(article.id));

    const handleSelect = (currentValue: string) => {
        const newValue = value.includes(currentValue)
            ? value.filter((id) => id !== currentValue)
            : [...value, currentValue];
        onChange(newValue);
    };

    const handleRemove = (idToRemove: string) => {
        onChange(value.filter((id) => id !== idToRemove));
    };

    return (
        <div className="space-y-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        Select related articles...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search articles..." />
                        <CommandList>
                            <CommandEmpty>No article found.</CommandEmpty>
                            <CommandGroup>
                                {articles.map((article) => (
                                    <CommandItem
                                        key={article.id}
                                        value={article.id}
                                        onSelect={() => handleSelect(article.id)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value.includes(article.id) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {article.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2">
                {selectedArticles.map((article) => (
                    <Badge key={article.id} variant="secondary" className="pl-2 pr-1 py-1">
                        {article.title}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 h-4 w-4 rounded-full hover:bg-muted-foreground/20"
                            onClick={() => handleRemove(article.id)}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {article.title}</span>
                        </Button>
                    </Badge>
                ))}
            </div>
        </div>
    );
}
