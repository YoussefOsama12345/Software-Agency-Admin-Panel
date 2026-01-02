'use client';

import { format } from 'date-fns';
import { Mail, MailOpen, Trash2, Calendar, User } from 'lucide-react';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Message } from '@/schemas/message.schema';

interface MessageListProps {
    messages: Message[];
    selectedId?: string;
    onSelect: (message: Message) => void;
    onDelete: (id: string) => void;
}

export function MessageList({ messages, selectedId, onSelect, onDelete }: MessageListProps) {
    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <Mail className="h-12 w-12 mb-4 opacity-50" />
                <p>No messages found</p>
            </div>
        );
    }

    return (
        <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="flex flex-col gap-2 p-4 pt-0 mt-5">
                {messages.map((message) => (
                    <button
                        key={message.id}
                        className={cn(
                            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                            selectedId === message.id && "bg-accent"
                        )}
                        onClick={() => onSelect(message)}
                    >
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="font-semibold">{message.name}</div>
                                {!message.isRead && (
                                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                                )}
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">
                                {message.createdAt && format(new Date(message.createdAt), 'PP')}
                            </div>
                        </div>
                        <div className="text-xs font-medium">{message.subject}</div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                            {message.message.substring(0, 300)}
                        </div>
                    </button>
                ))}
            </div>
        </ScrollArea>
    );
}

interface MessageDetailProps {
    message: Message | null;
    onDelete: (id: string) => void;
}

export function MessageDetail({ message, onDelete }: MessageDetailProps) {
    if (!message) {
        return (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <Mail className="h-12 w-12 mb-4 opacity-50" />
                <p>Select a message to read</p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-start justify-between p-4 border-b">
                <div className="flex items-start gap-4 text-sm">
                    <div className="grid gap-1">
                        <div className="font-semibold">{message.subject}</div>
                        <div className="line-clamp-1 text-xs">{message.name} &lt;{message.email}&gt;</div>
                        <div className="line-clamp-1 text-xs">
                            <span className="font-medium">Reply-To:</span> {message.email}
                        </div>
                    </div>
                </div>
                {message.createdAt && (
                    <div className="ml-auto text-xs text-muted-foreground">
                        {format(new Date(message.createdAt), 'PPpp')}
                    </div>
                )}
            </div>
            <div className="p-4 border-b bg-muted/20">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>From: {message.name}</span>
                    <span className="mx-1">•</span>
                    <Mail className="h-3 w-3" />
                    <span className="select-all">{message.email}</span>
                </div>
            </div>
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                {message.message}
            </div>
            <div className="flex items-center p-4 border-t gap-2">
                <ConfirmDeleteModal
                    onConfirm={() => {
                        if (message.id) {
                            onDelete(message.id);
                        }
                    }}
                    title={`Delete Message from ${message.name}?`}
                    description="Are you sure you want to delete this message? This action cannot be undone."
                    trigger={
                        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    }
                />
            </div>
        </div>
    );
}
