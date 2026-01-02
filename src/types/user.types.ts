
export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface User {
    id: string;
    username: string;
    email: string;
    phone?: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUser {
    username: string;
    email: string;
    password: string;
    phone?: string;
    role: Role;
}