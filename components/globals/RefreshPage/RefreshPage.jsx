import { refreshPath } from "@/app/actions";
import RefreshBtn from "./RefreshBtn";

const RefreshPage = () => {
    return (
        <form className="flex items-center" action={refreshPath}>
            <RefreshBtn />
        </form>
    );
};

export default RefreshPage;