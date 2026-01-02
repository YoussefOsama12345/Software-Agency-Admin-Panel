'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Mail, Lock, Building2 } from 'lucide-react';

import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const handleSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            await onSubmit(data);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            console.error('Login error:', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md border-0 shadow-2xl shadow-black/5 dark:shadow-black/20">
            <CardHeader className="space-y-4 pb-6">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                        <Building2 className="w-7 h-7 text-primary-foreground" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                    <CardDescription className="text-base">
                        Sign in to continue to your dashboard
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
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">Email address</FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <Mail
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                                                aria-hidden="true"
                                            />
                                            <Input
                                                type="email"
                                                placeholder="name@company.com"
                                                autoComplete="email"
                                                className="pl-11 h-12 bg-muted/50 border-muted-foreground/20 focus:bg-background focus:border-primary transition-all"
                                                disabled={isLoading}
                                                aria-describedby="email-error"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage id="email-error" />
                                </FormItem>
                            )}
                        />

                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                                        <Link
                                            href="/forget-password"
                                            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                                            tabIndex={-1}
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <div className="relative group">
                                            <Lock
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                                                aria-hidden="true"
                                            />
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                className="pl-11 pr-11 h-12 bg-muted/50 border-muted-foreground/20 focus:bg-background focus:border-primary transition-all"
                                                disabled={isLoading}
                                                aria-describedby="password-error"
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
                                    <FormMessage id="password-error" />
                                </FormItem>
                            )}
                        />

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm text-muted-foreground cursor-pointer select-none"
                            >
                                Remember me for 30 days
                            </label>
                        </div>

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
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
