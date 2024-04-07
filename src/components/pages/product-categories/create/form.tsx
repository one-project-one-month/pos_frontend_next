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
import { ProductCategory } from "@prisma/client";
import { productCategoryFormSchema } from "@/lib/zodFormSchema";
// let ggg = { productCategoryCode, productCategoryId, productCategoryName } as ProductCategory;
// const formSchema = z.object({
//     productCategoryName: z.string().min(2, {
//         message: "productCategoryName must be at least 2 characters.",
//     }),
//     productCategoryCode: z.string().min(3, {
//         message: "productCategoryCode must be at least 3 characters.",
//     }),
// });

export function CreateProductCategoriesFrom() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof productCategoryFormSchema.create>>({
        resolver: zodResolver(productCategoryFormSchema.create),
        defaultValues: {
            productCategoryCode: "",
            productCategoryName: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof productCategoryFormSchema.create>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="productCategoryName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>productCategoryName</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="productCategoryCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>productCategoryCode</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>must put unique value</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
