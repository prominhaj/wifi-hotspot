
import { logout } from "@/app/actions";
import SubmitButton from "../SubmitButton/SubmitButton";
import { cn } from "@/lib/utils";

const Logout = ({ className }) => {
    return (
        <form className="w-full" action={logout}>
            <SubmitButton className={cn(className ? className : "rounded-2xl", "w-full text-base")} variant="destructive">
                Logout
            </SubmitButton>
        </form >
    );
};

export default Logout;