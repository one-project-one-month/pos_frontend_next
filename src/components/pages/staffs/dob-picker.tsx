"use client";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { staffFormSchema } from "@/lib/zodFormSchema";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

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
                        {/* <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat={"dd-MM-yyyy"}
                            placeholderText="dd-MM-yyyy"
                        /> */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center">
                                    <Button
                                        id="start-date"
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start px-2 text-left font-normal",
                                            !field.value && "text-muted-foreground",
                                        )}>
                                        {field.value ? (
                                            format(field.value, "dd-MM-y")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    key="start"
                                    mode="single"
                                    selected={field.value!}
                                    onSelect={(value) => {
                                        field.onChange(value);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormDescription>dd-mm-yyyy</FormDescription>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default DateOfBirthPicker;
