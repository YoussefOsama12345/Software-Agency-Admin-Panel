'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Moon, Sun, Monitor } from 'lucide-react';

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppearanceSettingsData, appearanceSettingsSchema } from '@/schemas/settings.schema';

interface AppearanceFormProps {
    defaultValues: AppearanceSettingsData;
    onSubmit: (data: AppearanceSettingsData) => Promise<void>;
    isLoading?: boolean;
}

export function AppearanceForm({ defaultValues, onSubmit, isLoading = false }: AppearanceFormProps) {
    const form = useForm<AppearanceSettingsData>({
        resolver: zodResolver(appearanceSettingsSchema) as any,
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme Preferences</CardTitle>
                            <CardDescription>Select the theme for the dashboard.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormMessage />
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid max-w-3xl grid-cols-3 gap-8 pt-2"
                                        >
                                            <FormItem>
                                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                    <FormControl>
                                                        <RadioGroupItem value="light" className="sr-only" />
                                                    </FormControl>
                                                    <div className="flex flex-col items-center cursor-pointer rounded-md border-2 border-muted p-1 hover:border-accent">
                                                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                            </div>
                                                        </div>
                                                        <span className="block w-full p-2 text-center font-normal">
                                                            Light
                                                        </span>
                                                    </div>
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem>
                                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                    <FormControl>
                                                        <RadioGroupItem value="dark" className="sr-only" />
                                                    </FormControl>
                                                    <div className="flex flex-col items-center cursor-pointer rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                        </div>
                                                        <span className="block w-full p-2 text-center font-normal">
                                                            Dark
                                                        </span>
                                                    </div>
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem>
                                                <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                    <FormControl>
                                                        <RadioGroupItem value="system" className="sr-only" />
                                                    </FormControl>
                                                    <div className="flex flex-col items-center cursor-pointer rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                            </div>
                                                        </div>
                                                        <span className="block w-full p-2 text-center font-normal">
                                                            System
                                                        </span>
                                                    </div>
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Preferences
                    </Button>
                </div>
            </form>
        </Form>
    );
}
