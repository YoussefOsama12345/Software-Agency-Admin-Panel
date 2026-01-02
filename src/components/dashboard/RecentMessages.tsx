import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageItem } from './MessageItem';

interface Message {
    id: string;
    name: string;
    subject: string;
    time: string;
    isRead: boolean;
}

interface RecentMessagesProps {
    messages: Message[];
    className?: string;
}

export function RecentMessages({ messages, className }: RecentMessagesProps) {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Latest inquiries from your contact form</CardDescription>
                </div>
                <Link href="/messages">
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                        View all
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Badge>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {messages.map((message) => (
                        <MessageItem key={message.id} {...message} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
