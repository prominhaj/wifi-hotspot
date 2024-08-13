import { z } from 'zod';

const phoneSchema = z.object({
    phone: z.string().regex(/^01\d{9}$/, "Phone number must start with '01' and be 11 digits long")
});

const userInfoSchema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        phone: z
            .string()
            .regex(/^01\d{9}$/, "Phone number must start with '01' and be 11 digits long"),
        password: z
            .string()
            .min(4, 'Password must be at least 4 characters')
            .max(12, 'Password must not exceed 12 characters'),
        confirmPassword: z.string().min(4, 'Please confirm your password')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    });

export const phoneValidation = async (formData) => {
    const phone = formData.get('phone');
    const validatedPhone = phoneSchema.safeParse({ phone: phone });
    if (!validatedPhone.success) {
        return {
            errors: validatedPhone.error.flatten().fieldErrors
        };
    }
    return validatedPhone;
};

export const userValidation = async (formData) => {
    // Validate the form
    const validatedFields = userInfoSchema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }
    return validatedFields;
};
