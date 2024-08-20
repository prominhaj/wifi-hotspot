import { refreshPath } from "@/app/actions";
import RefreshBtn from "./RefreshBtn";

const RefreshPage = () => {
    return (
        <form action={refreshPath}>
            <RefreshBtn />
        </form>
    );
};

export default RefreshPage;