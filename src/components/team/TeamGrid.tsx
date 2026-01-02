import { TeamMember } from './TeamCard';
import { TeamCard } from './TeamCard';

interface TeamGridProps {
    members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
    if (members.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No team members found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or add a new member
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member) => (
                <TeamCard key={member.id} member={member} />
            ))}
        </div>
    );
}
