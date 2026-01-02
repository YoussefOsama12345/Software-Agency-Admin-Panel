import { Circle, Clock, CheckCircle2, ListTodo } from 'lucide-react';
import { StatsCard, StatsGrid } from '@/components/common/StatsCard';

interface TaskStatsProps {
    todoCount: number;
    inProgressCount: number;
    doneCount: number;
    totalCount: number;
}

export function TaskStats({ todoCount, inProgressCount, doneCount, totalCount }: TaskStatsProps) {
    return (
        <StatsGrid>
            <StatsCard
                title="To Do"
                value={todoCount}
                subtitle="Pending tasks"
                icon={Circle}
                color="blue"
            />
            <StatsCard
                title="In Progress"
                value={inProgressCount}
                subtitle="Currently working"
                icon={Clock}
                color="green"
            />
            <StatsCard
                title="Done"
                value={doneCount}
                subtitle="Completed tasks"
                icon={CheckCircle2}
                color="purple"
            />
            <StatsCard
                title="Total Tasks"
                value={totalCount}
                subtitle="All time tasks"
                icon={ListTodo}
                color="orange"
            />
        </StatsGrid>
    );
}
