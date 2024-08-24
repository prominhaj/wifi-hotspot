"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Form, FormField, FormItem, FormLabel, FormControl as FormControl2, FormMessage, } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import SubmitButton from '@/components/globals/SubmitButton/SubmitButton';
import FormControl from '../add/_components/FormControl';
import { createPackageSchema, updatePackageSchema } from '@/lib/validations/package';
import { createProfileInMikrotik, updateProfileInMikrotik } from '@/app/actions/mikrotik';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createPackage, updatePackageById } from '@/app/actions/package';

const CreateAddPackageForm = ({ serverProfile, defaultValueData, isEditing }) => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(isEditing ? updatePackageSchema : createPackageSchema),
        defaultValues: {
            packageName: defaultValueData?.packageName || '',
            profileName: defaultValueData?.profileName || '',
            price: defaultValueData?.price || '',
            desktopPrice: defaultValueData?.desktopPrice || '',
            validity: defaultValueData?.validity || '',
            discountPercentage: defaultValueData?.discountPercentage || '',
            speedLimit: defaultValueData?.speedLimit || '',
            hotspotServer: defaultValueData?.hotspotServer || serverProfile[0]?.name,
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const handleCreateProfile = async (values) => {
        const rate_limit = `${values.speedLimit}M/${values.speedLimit}M`;
        const profileName = values.profileName;

        try {
            // console.log(values);
            const createdProfileInMikrotik = await createProfileInMikrotik({ name: profileName, rate_limit });
            if (createdProfileInMikrotik[0].ret) {
                // Save Profile Data In DB
                const createdProfile = await createPackage(
                    { ...values, hotspotProfileId: createdProfileInMikrotik[0]?.ret }
                );
                if (createdProfile?.success) {
                    toast.success('Profile created successfully');
                    router.push(`/dashboard/packages`);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Handle Edit Functions
    const handleEditProfile = async (values) => {
        const rate_limit = `${values.speedLimit}M/${values.speedLimit}M`;
        const profileName = values.profileName;

        // Update Hotspot Profile 
        const updateHotspotProfileData = {
            hotspotProfileId: defaultValueData?.hotspotProfileId,
            name: profileName,
            rate_limit
        }

        try {
            const updateHotspotProfile = await updateProfileInMikrotik(updateHotspotProfileData);
            if (updateHotspotProfile?.success) {
                // Update Package Data In DB
                const updatedPackageData = {
                    ...values,
                    hotspotProfileId: defaultValueData?.hotspotProfileId
                }
                const updatedPackage = await updatePackageById(defaultValueData?.id, updatedPackageData);
                if (updatedPackage?.success) {
                    router.push(`/dashboard/packages`);
                    toast.success("Profile updated successfully")
                }
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(isEditing ? handleEditProfile : handleCreateProfile)} className='grid grid-cols-1 gap-5 md:grid-cols-2'>
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
                                            serverProfile?.map((server, index) => (
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
                        {isEditing ? "Update" : "Create"}
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
};

export default CreateAddPackageForm;
