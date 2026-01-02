import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, Shield, User as UserIcon, Mail, Calendar } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from './UserTable';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

interface UserCardProps {
    user: User;
}

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function UserCard({ user }: UserCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={user.image} />
                        <AvatarFallback className="text-lg">{getInitials(user.fullName)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <Link href={`/users/${user.id}/edit`} className="hover:underline">
                            <h3 className="font-semibold line-clamp-1">{user.fullName}</h3>
                        </Link>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="gap-1">
                            {user.role === 'admin' ? <Shield className="h-3 w-3" /> : <UserIcon className="h-3 w-3" />}
                            {user.role === 'admin' ? 'Admin' : 'User'}
                        </Badge>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/users/${user.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ConfirmDeleteModal
                            onConfirm={() => {
                                console.log('Delete user', user.id);
                                // Add actual delete logic here
                            }}
                            title={`Delete ${user.fullName}?`}
                            description="Are you sure you want to delete this user? This action cannot be undone."
                            trigger={
                                <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                </DropdownMenuItem>
                            }
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between pt-0">
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
