import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { redirect } from "next/navigation";

const DashboardButton = () => {

    const dashboardAction = async () => {
        "use server";
        redirect("/dashboard")
    }

    return (
        <form className="w-full" action={dashboardAction}>
            <SubmitButton loadingText="Dashboard" className="w-full" variant="primary">
                Dashboard
            </SubmitButton>
        </form>
    );
};

export default DashboardButton;