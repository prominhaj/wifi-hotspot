"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Form, FormField, FormItem, FormLabel, FormControl as FormControl2, FormMessage, } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import SubmitButton from '@/components/globals/SubmitButton/SubmitButton';
import FormControl from './FormControl';
import { createPackageSchema } from '@/lib/validations/package';
import { createProfileInMikrotik } from '@/app/actions/mikrotik';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createPackage } from '@/app/actions/package';

const CreateAddPackageForm = ({ serverProfile }) => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(createPackageSchema),
        defaultValues: {
            packageName: '',
            profileName: '',
            price: '',
            desktopPrice: '',
            validity: '',
            discountPercentage: '',
            speedLimit: '',
            hotspotServer: serverProfile[0]?.name,
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        const rate_limit = `${values.speedLimit}M/${values.speedLimit}M`;
        const profileName = values.profileName;

        try {
            // console.log(values);
            const createdProfileInMikrotik = await createProfileInMikrotik({ name: profileName, rate_limit });
            if (createdProfileInMikrotik[0].ret) {
                // Save Profile Data In DB
                const createdProfile = await createPackage(values);
                if (createdProfile?.success) {
                    toast.success('Profile created successfully');
                    router.push(`/dashboard/packages`);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                {/* packageName */}
                <FormControl
                    form={form}
                    name="packageName"
                    label="Package Name"
                    isSubmitting={isSubmitting}
                    placeholder="Package Name..."
                />
                {/* profileName */}
                <FormControl
                    form={form}
                    isSubmitting={isSubmitting}
                    name="profileName"
                    label="Profile Name"
                    placeholder="Profile Name..."
                />
                {/* price */}
                <FormControl
                    form={form}
                    isSubmitting={isSubmitting}
                    name="price"
                    label="Mobile Price"
                    placeholder="Mobile Price..."
                />
                {/* desktopPrice */}
                <FormControl
                    form={form}
                    isSubmitting={isSubmitting}
                    name="desktopPrice"
                    label="Desktop Price"
                    placeholder="Desktop Price..."
                />
                {/* validity */}
                <FormControl
                    form={form}
                    isSubmitting={isSubmitting}
                    name="validity"
                    label="Validity"
                    placeholder="Validity (days)..."
                />
                {/* discountPercentage */}
                <FormControl
                    form={form}
                    isSubmitting={isSubmitting}
                    name="discountPercentage"
                    label="Discount %"
                    placeholder="Discount %..."
                />
                {/* speedLimit */}
                <FormControl
                    form={form}
                    isSubmitting={isSubmitting}
                    name="speedLimit"
                    label="Speed Limit"
                    placeholder="Speed Limit..."
                />
                {/* hotspotServer */}
                <FormField
                    control={form.control}
                    name="hotspotServer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hotspot Server</FormLabel>
                            <FormControl2>
                                <Select {...field} disabled={isSubmitting}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {
                                            serverProfile.map((server, index) => (
                                                <SelectItem key={index} value={server.name}>
                                                    {server.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl2>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex items-center justify-end md:col-span-2 gap-x-2'>
                    <Link href='/dashboard/packages'>
                        <Button variant='outline' type='button'>
                            Cancel
                        </Button>
                    </Link>
                    <SubmitButton variant="primary" loading={isSubmitting} disabled={!isValid}>
                        Create
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
};

export default CreateAddPackageForm;
