'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Trash2, Linkedin, Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { TeamMember } from './TeamCard';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

interface TeamTableProps {
    members: TeamMember[];
}

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function TeamTable({ members }: TeamTableProps) {
    if (members.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p>No team members found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Socials</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={member.image} />
                                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="font-medium">{member.name}</div>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{member.position}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {member.linkedin && <SocialIcon href={member.linkedin} icon={Linkedin} color="text-[#0077b5]" />}
                                    {member.github && <SocialIcon href={member.github} icon={Github} color="text-foreground" />}
                                    {member.x && <SocialIcon href={member.x} icon={Twitter} color="text-foreground" />}
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {new Date(member.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600" asChild>
                                        <Link href={`/team/${member.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <ConfirmDeleteModal
                                        onConfirm={() => {
                                            console.log('Delete team member', member.id);
                                        }}
                                        title={`Remove ${member.name}?`}
                                        description="Are you sure you want to remove this team member? This action cannot be undone."
                                        confirmText="Remove Member"
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

import { LucideIcon } from 'lucide-react';

function SocialIcon({ href, icon: Icon, color }: { href: string; icon: LucideIcon | React.ComponentType<{ className?: string }>; color?: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded-full hover:bg-muted transition-colors ${color}`}
        >
            <Icon className="h-3.5 w-3.5" />
        </a>
    );
}
