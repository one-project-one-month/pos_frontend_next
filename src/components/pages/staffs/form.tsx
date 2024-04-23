"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { createStaffSchema } from "@/validations/staff";
import { useRouter } from "next-nprogress-bar";
import { $Enums, Staff } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateStaff, useUpdateStaff } from "@/services/api/staffs";
import DateOfBirthPicker from "./dob-picker";
import TextFormField from "./text-form-field";
import { toast } from "sonner";

interface Props {
    initialValues?: Staff;
    isEditMode?: boolean;
}

export function StaffForm({ initialValues, isEditMode = false }: Props) {
    const router = useRouter();
    const { mutate: createStaff, isPending: isCreating } = useCreateStaff();
    const { mutate: updateStaff, isPending: isUpdating } = useUpdateStaff();
    const form = useForm<z.infer<typeof createStaffSchema>>({
        resolver: zodResolver(createStaffSchema),
        defaultValues: {
            address: initialValues?.address ?? "someone",
            dateOfBirth: initialValues?.dateOfBirth
                ? new Date(initialValues?.dateOfBirth)
                : new Date(),
            gender: initialValues?.gender ?? "male",
            staffCode: initialValues?.staffCode ?? "",
            staffName: initialValues?.staffName ?? "",
            mobileNo: initialValues?.mobileNo ?? "",
            position: initialValues?.position ?? "cashier",
            password: initialValues?.password ?? "",
        },
    });

    function onSubmit(values: z.infer<typeof createStaffSchema>) {
        toast.info("Making the request...", { id: "info-toast" });
        if (!isEditMode) {
            createStaff(values, {
                onSuccess: () => {
                    toast.success("New staff created!");
                    router.push("/admin/staffs");
                },
                onError: (error) => {
                    console.error(error);
                    toast.error("Fail to create new staff!");
                },
                onSettled: () => {
                    toast.dismiss("info-toast");
                },
            });
        } else if (initialValues?.staffId && isEditMode) {
            updateStaff(
                { payload: values, id: initialValues.staffId },
                {
                    onSuccess: () => {
                        toast.success("Staff data updated!");
                        router.push("/admin/staffs");
                    },
                    onError: (error) => {
                        console.error(error);
                        toast.error("Fail to update the stuff!");
                    },
                    onSettled: () => {
                        toast.dismiss("info-toast");
                    },
                },
            );
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TextFormField
                    form={form}
                    name={"staffName"}
                    label="Staff Name"
                    placeholder="staff name"
                />
                <TextFormField
                    form={form}
                    name={"staffCode"}
                    label="Staff Code"
                    placeholder="staff code eg: sc:001"
                />
                <TextFormField
                    form={form}
                    name={"mobileNo"}
                    label="Mobile Number"
                    placeholder="mobile number"
                />
                <TextFormField
                    form={form}
                    name={"password"}
                    label="Password"
                    placeholder="password"
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
                                    className="flex space-x-4">
                                    {Object.values($Enums.Gender).map((gender) => {
                                        return (
                                            <FormItem
                                                key={gender}
                                                className="flex items-center space-x-1 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={gender} />
                                                </FormControl>
                                                <FormLabel className="font-sans capitalize">
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
                <DateOfBirthPicker form={form} />
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
                                    className="flex space-x-4">
                                    {Object.values($Enums.Position).map((position) => {
                                        return (
                                            <FormItem
                                                key={position}
                                                className="flex items-center space-x-1 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={position} />
                                                </FormControl>
                                                <FormLabel className="font-sans capitalize">
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
                <Button type="submit" size="lg" disabled={isUpdating || isCreating}>
                    Save
                </Button>
            </form>
        </Form>
    );
}
