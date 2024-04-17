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
import { staffFormSchema } from "@/lib/zodFormSchema";
import { useRouter } from "next/navigation";
import { $Enums, Staff } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateStaff, useUpdateStaff } from "@/services/api/staffs";
import DateOfBirthPicker from "./dob-picker";
import TextFormField from "./text-form-field";

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
                <TextFormField
                    form={form}
                    name={"staffName"}
                    label="staff name"
                    placeholder="staffName"
                />{" "}
                <TextFormField
                    form={form}
                    name={"staffCode"}
                    label="staff code"
                    placeholder="staff code eg: sc:001"
                />
                <TextFormField
                    form={form}
                    name={"mobileNo"}
                    label="mobileNo"
                    placeholder="mobileNo"
                />
                <TextFormField
                    form={form}
                    name={"password"}
                    label="Password"
                    placeholder="Password"
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
                                    className="flex  space-x-9">
                                    {Object.values($Enums.Gender).map((gender) => {
                                        return (
                                            <FormItem
                                                onSelect={(e) => {
                                                    e.currentTarget.classList.add("bg-red-400");
                                                }}
                                                key={gender}
                                                className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={gender} />
                                                </FormControl>
                                                <FormLabel
                                                    onSelect={(e) => {
                                                        e.currentTarget.classList.add("bg-red-400");
                                                    }}
                                                    className="font-sans ">
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
                                    className="flex  space-x-9">
                                    {Object.values($Enums.Position).map((position) => {
                                        return (
                                            <FormItem
                                                onSelect={(e) => {
                                                    e.currentTarget.classList.add("bg-red-400");
                                                }}
                                                key={position}
                                                className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={position} />
                                                </FormControl>
                                                <FormLabel
                                                    onSelect={(e) => {
                                                        e.currentTarget.classList.add("bg-red-400");
                                                    }}
                                                    className="font-sans ">
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
                    disabled={isUpdating || isCreating}>
                    Save
                </Button>
            </form>
        </Form>
    );
}
