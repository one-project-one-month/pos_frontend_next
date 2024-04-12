"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { staffFormSchema } from "@/lib/zodFormSchema";
import { useRouter } from "next/navigation";
import { $Enums, Product, Staff } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useCreateStaff, useUpdateStaff } from "@/services/api/staffs";

interface Props {
    initialValues?: Staff;
    isEditMode?: boolean;
}

export function StaffForm({ initialValues, isEditMode = false }: Props) {
    const router = useRouter();
    const { mutate: createStaff, isPending: isCreating } = useCreateStaff();
    const { mutate: updateStaff, isPending: isUpdating } = useUpdateStaff();
    // const { data: productCategories } = useGetProductCategories();
    const form = useForm<z.infer<typeof staffFormSchema>>({
        resolver: zodResolver(staffFormSchema),
        defaultValues: {
            address: initialValues?.address ?? "someone",
            dateOfBirth: initialValues?.dateOfBirth ?? new Date("2000-02-01"),
            gender: initialValues?.gender ?? "other",
            staffCode: initialValues?.staffCode ?? "someone",
            staffName: initialValues?.staffName ?? "someone",
            mobileNo: initialValues?.mobileNo ?? "someone",
            position: initialValues?.position ?? "cashier",
            password: initialValues?.password ?? "password",
        },
    });

    function onSubmit(values: z.infer<typeof staffFormSchema>) {
        console.log("submit:", values);
        if (!isEditMode) {
            createStaff(values, {
                onSuccess: () => {
                    router.push("/admin/staffs");
                },
                onError: (error) => {
                    console.error(error);
                },
            });
        } else if (initialValues?.staffId && isEditMode) {
            updateStaff(
                { payload: values, id: initialValues.staffId },
                {
                    onSuccess: () => {
                        router.push("/admin/staffs");
                    },
                    onError: (error) => {
                        console.error(error);
                    },
                },
            );
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="staffCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>staffCode</FormLabel>
                            <FormControl>
                                <Input placeholder="staffCode" {...field} />
                            </FormControl>
                            <FormDescription>must put unique value</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="staffName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>staffName</FormLabel>
                            <FormControl>
                                <Input placeholder="staffName" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />{" "}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex  space-x-9"
                                >
                                    {Object.values($Enums.Gender).map((gender) => {
                                        return (
                                            <FormItem
                                                onSelect={(e) => {
                                                    e.currentTarget.classList.add("bg-red-400");
                                                }}
                                                key={gender}
                                                className="flex items-center space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <RadioGroupItem value={gender} />
                                                </FormControl>
                                                <FormLabel
                                                    onSelect={(e) => {
                                                        e.currentTarget.classList.add("bg-red-400");
                                                    }}
                                                    className="font-sans "
                                                >
                                                    {gender}
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mobileNo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>mobileNo</FormLabel>
                            <FormControl>
                                <Input placeholder="mobileNo" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex  space-x-9"
                                >
                                    {Object.values($Enums.Position).map((position) => {
                                        return (
                                            <FormItem
                                                onSelect={(e) => {
                                                    e.currentTarget.classList.add("bg-red-400");
                                                }}
                                                key={position}
                                                className="flex items-center space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <RadioGroupItem value={position} />
                                                </FormControl>
                                                <FormLabel
                                                    onSelect={(e) => {
                                                        e.currentTarget.classList.add("bg-red-400");
                                                    }}
                                                    className="font-sans "
                                                >
                                                    {position}
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    variant={"destructive"}
                    size="lg"
                    disabled={isUpdating || isCreating}
                >
                    Save
                </Button>
            </form>
        </Form>
    );
}
