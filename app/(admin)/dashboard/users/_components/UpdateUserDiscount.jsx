import { updateUserDiscount } from "@/app/actions/user";
import { Button } from "@/components/ui/button";

const UpdateUserDiscount = () => {
    return (
        <form action={updateUserDiscount}>
            <Button>
                Update Discount
            </Button>
        </form>
    );
};

export default UpdateUserDiscount;