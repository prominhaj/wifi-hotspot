import { z } from 'zod';

// Zod schema for validation
export const createPackageSchema = z.object({
    packageName: z.string().min(1, { message: 'Package Name is required' }),
    profileName: z.string().min(1, { message: 'Profile Name is required' }),
    price: z
        .string()
        .min(1, { message: 'Price is required' })
        .regex(/^\d+(\.\d{1,2})?$/, { message: 'Invalid price format' }),
    desktopPrice: z
        .string()
        .min(1, { message: 'Desktop Price is required' })
        .regex(/^\d+(\.\d{1,2})?$/, { message: 'Invalid desktop price format' }),
    validity: z
        .string()
        .min(1, { message: 'Validity is required' })
        .regex(/^\d+$/, { message: 'Validity must be a number' }),
    discountPercentage: z
        .string()
        .min(1, { message: 'Discount Percentage is required' })
        .regex(/^\d+(\.\d{1,2})?$/, { message: 'Invalid discount percentage format' }),
    speedLimit: z
        .string()
        .min(1, { message: 'Speed Limit is required' })
        .regex(/^\d+$/, { message: 'Speed Limit must be a number' }),
    hotspotServer: z.string().min(1, { message: 'Hotspot Server is required' })
});
