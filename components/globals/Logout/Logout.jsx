
import { logout } from "@/app/actions";
import SubmitButton from "../SubmitButton/SubmitButton";
import { cn } from "@/lib/utils";

const Logout = ({ className, size }) => {
    return (
        <form className="w-full" action={logout}>
            <SubmitButton size={size} className={cn(className ? className : "rounded-2xl text-base", "w-full")} variant="destructive">
                Logout
            </SubmitButton>
        </form >
    );
};

export default Logout;