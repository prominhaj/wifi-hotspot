
import { logout } from "@/app/actions";
import SubmitButton from "../SubmitButton/SubmitButton";

const Logout = () => {
    return (
        <form action={logout}>
            <SubmitButton className="w-full text-base rounded-2xl" variant="destructive">
                Logout
            </SubmitButton>
        </form>
    );
};

export default Logout;