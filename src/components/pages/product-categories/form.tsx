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
import { productCategoryFormSchema } from "@/lib/zodFormSchema";
import { useCreateProductCategory } from "@/services/api/product-categories";
import { useRouter } from "next/navigation";

export function CreateProductCategoryFrom() {
    const router = useRouter();
    const { mutate, isPending } = useCreateProductCategory();
    const form = useForm<z.infer<typeof productCategoryFormSchema.create>>({
        resolver: zodResolver(productCategoryFormSchema.create),
        defaultValues: {
            productCategoryCode: "",
            productCategoryName: "",
        },
    });

    function onSubmit(values: z.infer<typeof productCategoryFormSchema.create>) {
        mutate(values, {
            onSuccess: () => {
                router.push("/product-categories");
            },
            onError: (error) => {
                console.error(error);
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="productCategoryName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormDescription>Descriptive name for the category</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="productCategoryCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Category Code</FormLabel>
                            <FormControl>
                                <Input placeholder="code" {...field} />
                            </FormControl>
                            <FormDescription>Unique code for the category</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    Submit
                </Button>
            </form>
        </Form>
    );
}
