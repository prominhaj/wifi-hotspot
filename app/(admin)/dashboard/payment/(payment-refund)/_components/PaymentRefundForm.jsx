"use client";
import { paymentRefundInBkash } from "@/app/actions/payment";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentRefundForm = () => {
    const { back } = useRouter();

    const handleRefund = async (formData) => {
        const transactionId = formData.get("transactionId")
        try {
            const result = await paymentRefundInBkash(transactionId);
            if (result?.success) {
                toast.success(result?.message)
                back();
            }
            else if (!result?.success) {
                toast.error(result?.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={handleRefund} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="transaction">Transaction Id</Label>
                <Input name="transactionId" id="transaction" placeholder="Enter transaction id" />
            </div>
            <SubmitButton variant="primary">
                Refund
            </SubmitButton>
        </form>
    );
};

export default PaymentRefundForm;