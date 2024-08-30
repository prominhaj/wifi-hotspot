"use client";

import { addUserDiscount } from "@/app/actions/user";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback } from "react";
import { toast } from "sonner";

const DiscountForm = ({ onChangeOpen }) => {

    const addDiscount = useCallback(async (formData) => {
        const phone = formData.get('phone');
        const discount = formData.get('discount');
        if (!phone || !discount) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const result = await addUserDiscount(phone, discount)
            if (result?.success) {
                toast.success(result?.message);
                onChangeOpen(false);
            } else {
                toast.error(result?.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [])

    return (
        <form action={addDiscount} className="grid gap-3">
            <div className="flex flex-col items-start gap-1.5">
                <Label className="block" htmlFor="phone">Phone No</Label>
                <Input id="phone" name="phone" type="text" placeholder="Phone" required />
            </div>
            <div className="flex flex-col items-start gap-1.5">
                <Label className="block" htmlFor="discount">Discount %</Label>
                <Input id="discount" name="discount" type="number" placeholder="Discount" required />
            </div>
            <SubmitButton className="mt-2" variant="primary">
                Save Discount
            </SubmitButton>
        </form>
    );
};

export default DiscountForm;