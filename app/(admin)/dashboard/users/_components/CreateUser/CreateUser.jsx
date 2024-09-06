"use client";
import { createUserByAdmin } from "@/app/actions/user";
import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { KeyRound, Phone, UserPen } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const CreateUser = () => {
    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleAdminCreateAccount = useCallback(async (formData) => {
        setErrors({});
        const fields = ["name", "phone", "password"];
        const data = {};

        fields.forEach((field) => {
            data[field] = formData.get(field);
        });

        const missingFields = fields.filter((field) => !data[field]);

        if (missingFields.length) {
            setErrors(
                missingFields.reduce((acc, field) => {
                    acc[field] = [`Please enter a ${field}`];
                    return acc;
                }, {})
            );
            return;
        }

        try {
            const createdAccount = await createUserByAdmin(data);
            if (createdAccount?.success) {
                toast.success(createdAccount?.message);
                setIsOpen(false);
            } else {
                setErrors({ phone: createdAccount?.phone ? [createdAccount?.message] : [] });
                toast.error(createdAccount?.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, []);

    const formFields = [
        { name: "name", label: "Name", placeholder: "Enter a name", icon: <UserPen className="w-4 h-4" /> },
        { name: "phone", label: "Phone Number", type: "tel", maxLength: 11, minLength: 11, placeholder: "01786XXXXXX", icon: <Phone className="w-4 h-4" /> },
        { name: "password", label: "Password", type: "password", maxLength: 12, minLength: 4, placeholder: "********", icon: <KeyRound className="w-4 h-4" /> },
    ];

    return (
        <Dialog defaultOpen={false} open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="default">Add User</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>
                <form action={handleAdminCreateAccount}>
                    <div className="space-y-4">
                        {formFields.map((field, idx) => (
                            <FormControl
                                key={idx}
                                name={field.name}
                                label={field.label}
                                type={field.type}
                                maxLength={field?.maxLength}
                                minLength={field?.minLength}
                                icon={field?.icon}
                                placeholder={field?.placeholder}
                                error={errors[field.name]}
                            >
                                {errors[field.name] && (
                                    <p className="flex flex-col items-start gap-0.5 text-red-500">
                                        {errors[field.name].map((mess, i) => (
                                            <small key={i}>{mess}</small>
                                        ))}
                                    </p>
                                )}
                            </FormControl>
                        ))}
                        <DialogFooter>
                            <SubmitButton variant="default">Create Account</SubmitButton>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUser;
