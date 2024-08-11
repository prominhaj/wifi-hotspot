import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormControl = ({ label, name, type = "text", required = true, placeHolder, defaultValue }) => {
    return (
        <div>
            <Label className="block mb-1.5" htmlFor={name}>{label}</Label>
            <Input
                type={type}
                id={name}
                name={name}
                required={required}
                placeHolder={placeHolder}
                defaultValue={defaultValue || ""}
            />
        </div>
    );
};

export default FormControl;