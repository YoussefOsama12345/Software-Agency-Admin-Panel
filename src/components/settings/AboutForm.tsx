'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, Trash2, Globe, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AboutFormData, aboutSchema } from '@/schemas/about.schema';

interface AboutFormProps {
    defaultValues?: Partial<AboutFormData>;
    onSubmit: (data: AboutFormData) => Promise<void>;
    isLoading?: boolean;
}

export function AboutForm({ defaultValues, onSubmit, isLoading = false }: AboutFormProps) {
    const [missionLang, setMissionLang] = useState<'en' | 'ar'>('en');
    const [valuesLang, setValuesLang] = useState<'en' | 'ar'>('en');

    const form = useForm<AboutFormData>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
            title: defaultValues?.title || '',
            description: defaultValues?.description || '',
            mission: defaultValues?.mission || '',
            mission_ar: defaultValues?.mission_ar || '',
            vision: defaultValues?.vision || '',
            vision_ar: defaultValues?.vision_ar || '',
            values: defaultValues?.values?.map(v => ({
                value: v.value || '',
                value_ar: v.value_ar || ''
            })) || [],
            website: defaultValues?.website || '',
            email: defaultValues?.email || '',
            phone: defaultValues?.phone || '',
            facebook: defaultValues?.facebook || '',
            x: defaultValues?.x || '',
            linkedin: defaultValues?.linkedin || '',
            instagram: defaultValues?.instagram || '',
            youtube: defaultValues?.youtube || '',
            tiktok: defaultValues?.tiktok || '',
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "values",
        rules: { maxLength: 10 }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* General Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                        <CardDescription>Basic details about your agency.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Title *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Software Agency" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9" placeholder="https://example.com" {...field} value={field.value || ''} disabled={isLoading} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9" placeholder="contact@example.com" {...field} value={field.value || ''} disabled={isLoading} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>About Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us your story..."
                                            className="min-h-[120px]"
                                            {...field}
                                            value={field.value || ''}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Mission & Vision Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle>Mission & Vision</CardTitle>
                            <CardDescription>Define your strategic direction.</CardDescription>
                        </div>
                        <Select
                            value={missionLang}
                            onValueChange={(v: 'en' | 'ar') => setMissionLang(v)}
                        >
                            <SelectTrigger className="w-[100px] h-8">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="ar">Arabic</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        {missionLang === 'en' ? (
                            <>
                                <FormField
                                    control={form.control}
                                    name="mission"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Our Mission (English)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="To empower businesses through technology..."
                                                    {...field}
                                                    value={field.value || ''}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="vision"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Our Vision (English)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="A world where software solves every problem..."
                                                    {...field}
                                                    value={field.value || ''}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        ) : (
                            <>
                                <FormField
                                    control={form.control}
                                    name="mission_ar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Our Mission (Arabic)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="لتمكين الشركات من خلال التكنولوجيا..."
                                                    className="text-right"
                                                    dir="rtl"
                                                    {...field}
                                                    value={field.value || ''}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="vision_ar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Our Vision (Arabic)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="عالم تحل فيه البرمجيات كل مشكلة..."
                                                    className="text-right"
                                                    dir="rtl"
                                                    {...field}
                                                    value={field.value || ''}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Core Values Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle>Core Values</CardTitle>
                            <CardDescription>What you stand for (Max 10).</CardDescription>
                        </div>
                        <Select
                            value={valuesLang}
                            onValueChange={(v: 'en' | 'ar') => setValuesLang(v)}
                        >
                            <SelectTrigger className="w-[100px] h-8">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="ar">Arabic</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    {valuesLang === 'en' ? (
                                        <FormField
                                            control={form.control}
                                            name={`values.${index}.value`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} placeholder="e.g., Integrity" disabled={isLoading} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        <FormField
                                            control={form.control}
                                            name={`values.${index}.value_ar`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} placeholder="مثال: النزاهة" className="text-right" dir="rtl" disabled={isLoading} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => remove(index)}
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => append({ value: "New Value", value_ar: "قيمة جديدة" })}
                            disabled={isLoading || fields.length >= 10}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Value
                        </Button>
                    </CardContent>
                </Card>

                {/* Social Media Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Social Media</CardTitle>
                        <CardDescription>Connect with your audience.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Facebook</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Facebook className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input className="pl-9" placeholder="https://facebook.com/..." {...field} value={field.value || ''} disabled={isLoading} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="x"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>X (Twitter)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Twitter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input className="pl-9" placeholder="https://x.com/..." {...field} value={field.value || ''} disabled={isLoading} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LinkedIn</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Linkedin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input className="pl-9" placeholder="https://linkedin.com/..." {...field} value={field.value || ''} disabled={isLoading} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Instagram className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input className="pl-9" placeholder="https://instagram.com/..." {...field} value={field.value || ''} disabled={isLoading} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtube"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>YouTube</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Youtube className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input className="pl-9" placeholder="https://youtube.com/..." {...field} value={field.value || ''} disabled={isLoading} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tiktok"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>TikTok</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            {/* Lucide doesn't have TikTok yet, using default icon */}
                                            <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input className="pl-9" placeholder="https://tiktok.com/@..." {...field} value={field.value || ''} disabled={isLoading} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Settings
                    </Button>
                </div>
            </form>
        </Form>
    );
}
