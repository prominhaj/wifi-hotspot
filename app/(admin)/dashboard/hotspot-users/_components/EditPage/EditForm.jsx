
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import FormControl from "./FormControl";

const EditForm = ({ editHotspotUser }) => {

    return (
        <form className="grid grid-cols-1 gap-3">
            <FormControl defaultValue={editHotspotUser?.username} name="username">
                Username
            </FormControl>
            <FormControl defaultValue={editHotspotUser?.password} name="password">
                Password
            </FormControl>
            <FormControl defaultValue={editHotspotUser?.macAddress} name="mac-address">
                Mac Address
            </FormControl>
            <SubmitButton className="mt-1.5" variant="primary" size="sm">
                Update Details
            </SubmitButton>
        </form>
    );
};

export default EditForm;