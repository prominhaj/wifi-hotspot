import {
    FormControl as FormControl2,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormControl = ({ form, label, name, isSubmitting, placeholder }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl2>
                        <Input
                            disabled={isSubmitting}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl2>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormControl;