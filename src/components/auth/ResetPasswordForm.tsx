'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Lock, LockKeyhole, Check } from 'lucide-react';

import { resetPasswordSchema, type ResetPasswordFormData } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';

interface ResetPasswordFormProps {
    email?: string;
    onSubmit: (data: ResetPasswordFormData) => Promise<void>;
}

interface PasswordRequirement {
    label: string;
    regex: RegExp;
}

const passwordRequirements: PasswordRequirement[] = [
    { label: 'At least 8 characters', regex: /.{8,}/ },
    { label: 'One uppercase letter', regex: /[A-Z]/ },
    { label: 'One lowercase letter', regex: /[a-z]/ },
    { label: 'One number', regex: /[0-9]/ },
];

export function ResetPasswordForm({ email, onSubmit }: ResetPasswordFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const password = form.watch('password');

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const toggleConfirmPasswordVisibility = useCallback(() => {
        setShowConfirmPassword((prev) => !prev);
    }, []);

    const handleSubmit = async (data: ResetPasswordFormData) => {
        try {
            setIsLoading(true);
            await onSubmit(data);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            console.error('Reset password error:', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md border-0 shadow-2xl shadow-black/5 dark:shadow-black/20">
            <CardHeader className="space-y-4 pb-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                        <LockKeyhole className="w-7 h-7 text-primary-foreground" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
                    <CardDescription className="text-base">
                        {email ? (
                            <>Create a new password for <span className="font-medium text-foreground">{email}</span></>
                        ) : (
                            'Your new password must be different from previously used passwords.'
                        )}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="pb-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-5"
                        noValidate
                    >
                        {/* New Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">New password</FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <Lock
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                                                aria-hidden="true"
                                            />
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter new password"
                                                autoComplete="new-password"
                                                className="pl-11 pr-11 h-12 bg-muted/50 border-muted-foreground/20 focus:bg-background focus:border-primary transition-all"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                                                ) : (
                                                    <Eye className="h-4 w-4" aria-hidden="true" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Requirements */}
                        {password && (
                            <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                                {passwordRequirements.map((req, index) => {
                                    const isMet = req.regex.test(password);
                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-2 text-sm transition-colors ${isMet ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                                                }`}
                                        >
                                            <Check
                                                className={`h-4 w-4 ${isMet ? 'opacity-100' : 'opacity-30'}`}
                                            />
                                            <span>{req.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Confirm Password Field */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">Confirm password</FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <Lock
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                                                aria-hidden="true"
                                            />
                                            <Input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="Confirm new password"
                                                autoComplete="new-password"
                                                className="pl-11 pr-11 h-12 bg-muted/50 border-muted-foreground/20 focus:bg-background focus:border-primary transition-all"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={toggleConfirmPasswordVisibility}
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
                                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                                                ) : (
                                                    <Eye className="h-4 w-4" aria-hidden="true" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                            disabled={isLoading}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                                    Resetting password...
                                </>
                            ) : (
                                'Reset password'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
