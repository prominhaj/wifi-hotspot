"use client";

import { changeOtpCode } from "@/app/actions/otp";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { phoneValidation } from "@/lib/validations/user";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EditNumber = ({ number, id }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState(null);

    const changeOtpNumber = async (formData) => {
        setError(null);
        try {
            const numberValidation = await phoneValidation(formData);
            if (numberValidation.errors) {
                setError(numberValidation.errors);
                return;
            }
            else if (numberValidation?.success) {
                const newNumber = numberValidation.data.phone;
                if (number !== newNumber) {
                    const result = await changeOtpCode(newNumber, id);
                    if (result.success) {
                        toast.success(result.message);
                        setIsEdit(false);
                    }
                    else {
                        setError({
                            phone: [result.message]
                        })
                        toast.error(result.message)
                    }
                }
                else {
                    setIsEdit(false)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="mb-3">
            <div className="flex items-center justify-center w-3/5 gap-3 mx-auto">
                {
                    isEdit ? (
                        <form action={changeOtpNumber}>
                            <div className="flex items-start gap-3">
                                <Input
                                    type="tel"
                                    maxLength={11}
                                    minLength={11}
                                    required={true}
                                    name="phone"
                                    defaultValue={number}
                                    placeholder="01775XXXXXX"
                                    className={cn(error?.phone && "border-red-500", "text-base")}
                                />
                                <SubmitButton>
                                    Send
                                </SubmitButton>
                            </div>
                            {error?.phone && <p className="w-full text-red-500">
                                {error?.phone.map((mess, i) => (
                                    <small key={i}>{mess}</small>
                                ))}
                            </p>}
                        </form>
                    ) : (
                        <>
                            <h6 className="text-base font-medium text-center opacity-70">OTP Sent: {number}
                            </h6>
                            <button onClick={() => setIsEdit(!isEdit)}>
                                <Pencil className="w-4 h-4" />
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default EditNumber;