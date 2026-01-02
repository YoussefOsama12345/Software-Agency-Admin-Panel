import { Task } from '@/schemas/task.schema';
import { TaskCard } from './TaskCard';
import { CheckCircle2 } from 'lucide-react';

interface TaskGridProps {
    tasks: Task[];
}

export function TaskGrid({ tasks }: TaskGridProps) {
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">No tasks found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or create a new task
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
