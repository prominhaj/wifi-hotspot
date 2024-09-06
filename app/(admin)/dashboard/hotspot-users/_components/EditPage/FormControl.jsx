import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormControl = ({ children, name, defaultValue, disabled = false }) => {
    return (
        <div>
            <Label htmlFor={name}>
                {children}
            </Label>
            <Input
                id={name}
                name={name}
                type="text"
                className="mt-1"
                defaultValue={defaultValue || ""}
                placeholder={name}
                disabled={disabled}
            />
        </div>
    );
};

export default FormControl;