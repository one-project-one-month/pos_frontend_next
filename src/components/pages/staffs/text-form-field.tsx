import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createStaffSchema } from "@/validations/staff";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface Props {
    form: UseFormReturn<z.infer<typeof createStaffSchema>, any, undefined>;
    name:
        | "staffCode"
        | "staffName"
        | "dateOfBirth"
        | "mobileNo"
        | "address"
        | "gender"
        | "position"
        | "password";
    label: string;
    placeholder?: string;
    description?: string;
}

const TextFormField = ({ form, name, label, placeholder = "", description = "" }: Props) => {
    if (name === "gender" || name === "dateOfBirth" || name === "position") return null;
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextFormField;
