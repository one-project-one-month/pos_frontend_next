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
import { Product, ProductCategory } from "@prisma/client";
import { productCategoryFormSchema, productFormSchema } from "@/lib/zodFormSchema";
import SelectScrollable from "../SelectScrollable";
// let ggg = { productCategoryCode, productCategoryId, productCategoryName } as ProductCategory;
// const formSchema = z.object({
//     productCategoryName: z.string().min(2, {
//         message: "productCategoryName must be at least 2 characters.",
//     }),
//     productCategoryCode: z.string().min(3, {
//         message: "productCategoryCode must be at least 3 characters.",
//     }),
// });

export function CreateProductFrom() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof productFormSchema.create>>({
        resolver: zodResolver(productFormSchema.create),
        defaultValues: {
            categoryCode: "",
            price: 20,
            productCode: "sdsdff",
            productName: "spoon",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof productFormSchema.create>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("submit:", values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>productName</FormLabel>
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
                    name="price"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        onChange={(e) => {
                                            form.setValue("price", Number(e.target.value));
                                        }}
                                        placeholder="Enter Price"
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="productCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>productCode</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>must put unique value</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryCode"
                    shouldUnregister
                    render={({ field }) => {
                        // console.log(field);
                        return (
                            <FormItem>
                                <FormLabel>categoryCode</FormLabel>
                                <FormControl>
                                    <SelectScrollable setValue={form.setValue} />
                                </FormControl>
                                <FormDescription>must put unique value</FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
