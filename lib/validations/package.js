import { z } from 'zod';

// Zod schema for validation
export const createPackageSchema = z.object({
    packageName: z.string().min(1, { message: 'Package Name is required' }),
    profileName: z.string().min(1, { message: 'Profile Name is required' }),
    price: z
        .number({ invalid_type_error: 'Price must be a number' })
        .min(0.01, { message: 'Price must be greater than 0' }),
    desktopPrice: z
        .number({ invalid_type_error: 'Desktop Price must be a number' })
        .min(0.01, { message: 'Desktop Price must be greater than 0' }),
    validity: z
        .number({ invalid_type_error: 'Validity must be a number' })
        .min(1, { message: 'Validity must be at least 1 day' }),
    discountPercentage: z
        .number({ invalid_type_error: 'Discount Percentage must be a number' })
        .min(0, { message: 'Discount Percentage must be 0 or greater' })
        .max(100, { message: 'Discount Percentage must be 100 or less' }),
    speedLimit: z
        .string()
        .min(1, { message: 'Speed Limit is required' })
        .regex(/^\d+$/, { message: 'Speed Limit must be a number' }),
    hotspotServer: z.string().min(1, { message: 'Hotspot Server is required' })
});
