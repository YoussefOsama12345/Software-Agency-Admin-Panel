'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CreateUserFormData, UpdateUserFormData, createUserSchema, updateUserSchema } from '@/schemas/user.schema';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';

type UserFormData = CreateUserFormData | UpdateUserFormData;

interface UserFormProps {
    mode: 'create' | 'edit';
    defaultValues?: Partial<UserFormData>;
    onSubmit: (data: UserFormData) => Promise<void>;
    onDelete?: () => Promise<void>;
    isLoading?: boolean;
    submitLabel?: string;
    headerTitle?: string;
    headerDescription?: string;
}

export function UserForm({
    mode,
    defaultValues,
    onSubmit,
    onDelete,
    isLoading = false,
    submitLabel,
    headerTitle,
    headerDescription,
}: UserFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const form = useForm<UserFormData>({
        resolver: zodResolver(mode === 'create' ? createUserSchema : updateUserSchema),
        defaultValues: {
            fullName: defaultValues?.fullName || '',
            email: defaultValues?.email || '',
            phone: defaultValues?.phone || '',
            role: defaultValues?.role || 'user',
            ...(mode === 'create' ? { password: '' } : {}),
        },
    });

    const handleSubmit = async (data: UserFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!onDelete) return;
        setIsDeleting(true);
        try {
            await onDelete();
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {/* Full Name */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Role */}
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role *</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Admins have full access to the system.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone (Optional) */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+1 234 567 8900"
                                        {...field}
                                        value={field.value || ''}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field - Only show in create mode */}
                    {mode === 'create' && (
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                {...field}
                                                disabled={isLoading}
                                                className="pr-10"
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    <FormDescription>
                                        Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading || isDeleting}
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    {onDelete && (
                        <ConfirmDeleteModal
                            trigger={
                                <Button
                                    type="button"
                                    variant="destructive"
                                    disabled={isDeleting || isLoading}
                                >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            }
                            onConfirm={handleDelete}
                            isDeleting={isDeleting}
                            title="Delete User"
                            description="Are you sure you want to delete this user? This action cannot be undone."
                        />
                    )}
                    <Button type="submit" disabled={isLoading || isDeleting}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {submitLabel || (mode === 'create' ? 'Create User' : 'Save Changes')}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
