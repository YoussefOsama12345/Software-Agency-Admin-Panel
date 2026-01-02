import Link from 'next/link';
import { MoreHorizontal, Edit, Trash2, Linkedin, Github, Facebook, Instagram, Twitter } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

export interface TeamMember {
    id: string;
    name: string;
    position: string;
    bio: string;
    image: string;
    linkedin?: string;
    github?: string;
    x?: string;
    facebook?: string;
    instagram?: string;
    createdAt: string;
    updatedAt: string;
}

interface TeamCardProps {
    member: TeamMember;
}

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function TeamCard({ member }: TeamCardProps) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col group overflow-hidden border-border/50 bg-gradient-to-b from-card to-secondary/10 p-0 gap-0">
            {/* Header / Cover */}
            <div className="relative h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
                <div className="absolute top-2 right-2 z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/70 hover:text-foreground hover:bg-background/20 backdrop-blur-sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/team/${member.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <ConfirmDeleteModal
                                onConfirm={() => {
                                    console.log('Delete team member', member.id);
                                }}
                                title={`Remove ${member.name}?`}
                                description="Are you sure you want to remove this team member? This action cannot be undone."
                                confirmText="Remove Member"
                                trigger={
                                    <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove Member
                                    </DropdownMenuItem>
                                }
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <CardContent className="flex-1 flex flex-col pt-0 px-4 pb-4 -mt-12 relative">
                {/* Avatar */}
                <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-sm ring-1 ring-border/10">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                        <AvatarFallback className="text-lg bg-primary/5 text-primary font-medium">
                            {getInitials(member.name)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Content */}
                <div className="space-y-1 mb-4">
                    <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                        {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary/80">
                        {member.position}
                    </p>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                    {member.bio}
                </p>

                {/* Social Links */}
                <div className="pt-4 border-t flex items-center gap-1.5 flex-wrap">
                    {member.linkedin && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full text-muted-foreground hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors">
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {member.github && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors">
                            <a href={member.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {member.x && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors">
                            <a href={member.x} target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {member.facebook && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full text-muted-foreground hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors">
                            <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    {member.instagram && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full text-muted-foreground hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-colors">
                            <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
