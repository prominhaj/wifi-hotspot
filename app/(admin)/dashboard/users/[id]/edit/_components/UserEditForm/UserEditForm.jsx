"use client";
import { updateUserData } from "@/app/actions/user";
import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserEditForm = ({ user }) => {
    const { push } = useRouter();

    const handleUpdateUserInfo = async (formData) => {
        const updatedInfo = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            discount: formData.get('discount'),
        }
        try {
            const updated = await updateUserData(user?.id, updatedInfo);
            if (updated?.success) {
                toast.success(updated?.message)
                push("/dashboard/users")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={handleUpdateUserInfo} className="space-y-2.5">
            <FormControl name="name" label="Name" placeholder="name..." defaultValue={user?.name} required />
            <FormControl name="phone" label="Phone" placeholder="phone..." defaultValue={user?.phone} required />
            <FormControl name="password" label="Password" placeholder="password..." defaultValue={user?.password} required />
            <FormControl name="discount" label="Discount" type="number" placeholder="discount..." defaultValue={user?.discount} required />
            <SubmitButton className="w-full" variant="primary">
                Save
            </SubmitButton>
        </form>
    );
};

export default UserEditForm;