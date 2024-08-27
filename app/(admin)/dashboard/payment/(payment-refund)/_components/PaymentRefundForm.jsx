
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PaymentRefundForm = () => {
    return (
        <form className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="transaction">Transaction Id</Label>
                <Input id="transaction" placeholder="Enter transaction id" />
            </div>
            <SubmitButton>
                Refund
            </SubmitButton>
        </form>
    );
};

export default PaymentRefundForm;