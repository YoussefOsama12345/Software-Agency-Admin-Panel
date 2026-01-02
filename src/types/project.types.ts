export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
export type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Project {
    id: string;
    name: string;
    description?: string;
    clientId: string;
    clientName?: string;
    budget?: number;
    status: ProjectStatus;
    priority: ProjectPriority;
    deadline?: string;
    progress?: number;
    tasksCount?: number;
    completedTasksCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectFilters {
    status?: ProjectStatus;
    priority?: ProjectPriority;
    search?: string;
}
