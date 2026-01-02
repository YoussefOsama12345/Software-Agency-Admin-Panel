import { z } from 'zod';

const optionalUrl = z
    .string()
    .url('Invalid URL')
    .trim()
    .optional();


export const createTeamSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .trim(),

    position: z
        .string()
        .min(2, 'Position is required')
        .max(100, 'Position must be less than 100 characters')
        .trim(),

    bio: z
        .string()
        .min(10, 'Bio must be at least 10 characters')
        .max(2000, 'Bio must be less than 2000 characters')
        .trim(),

    image: z
        .string()
        .url('Invalid image URL')
        .trim(),

    linkedin: optionalUrl,
    github: optionalUrl,
    x: optionalUrl,
    facebook: optionalUrl,
    instagram: optionalUrl,
});


export const updateTeamSchema = z
    .object({
        id: z
            .string('Team member id is required')
            .uuid('Invalid team member id'),

        name: z
            .string()
            .min(2)
            .max(100)
            .trim()
            .optional(),

        position: z
            .string()
            .min(2)
            .max(100)
            .trim()
            .optional(),

        bio: z
            .string()
            .min(10)
            .max(2000)
            .trim()
            .optional(),

        image: z
            .string()
            .url()
            .trim()
            .optional(),

        linkedin: optionalUrl,
        github: optionalUrl,
        x: optionalUrl,
        facebook: optionalUrl,
        instagram: optionalUrl,
    })
    .refine(
        (data) => {
            const { id, ...rest } = data;
            return Object.keys(rest).length > 0;
        },
        {
            message: 'At least one field must be updated',
        }
    );


export type CreateTeamFormData = z.infer<typeof createTeamSchema>;
export type UpdateTeamFormData = z.infer<typeof updateTeamSchema>;
