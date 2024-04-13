"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { staffFormSchema } from "@/lib/zodFormSchema";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    form: UseFormReturn<z.infer<typeof staffFormSchema>, any, undefined>;
}

const DateOfBirthPicker = ({ form }: Props) => {
    return (
        <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => {
                return (
                    <FormItem className="flex flex-col">
                        <FormLabel>Date of birth</FormLabel>
                        <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat={"dd-MM-yyyy"}
                            placeholderText="dd-MM-yyyy"
                        />
                        <FormDescription>dd-mm-yyyy</FormDescription>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default DateOfBirthPicker;
