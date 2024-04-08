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
import { productFormSchema } from "@/lib/zodFormSchema";
import CategorySelect from "./category-select";
import { useGetProductCategories } from "@/services/api/product-categories";
import { useCreateProduct } from "@/services/api/products";
import { useRouter } from "next/navigation";

export function CreateProductForm() {
    const router = useRouter();
    const { mutate: createProduct, isPending } = useCreateProduct();
    const { data: productCategories } = useGetProductCategories();
    const form = useForm<z.infer<typeof productFormSchema.create>>({
        resolver: zodResolver(productFormSchema.create),
        defaultValues: {
            categoryCode: "",
            price: 0,
            productCode: "",
            productName: "",
        },
    });

    function onSubmit(values: z.infer<typeof productFormSchema.create>) {
        console.log("submit:", values);
        createProduct(values, {
            onSuccess: () => {
                router.push("/products");
            },
            onError: (error) => {
                console.error(error);
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
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
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        value={field.value}
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
                            <FormLabel>Product Code</FormLabel>
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
                                <FormLabel>Category Code</FormLabel>
                                <FormControl>
                                    <CategorySelect
                                        values={productCategories}
                                        setValue={form.setValue}
                                    />
                                </FormControl>
                                <FormDescription>must put unique value</FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <Button type="submit" disabled={isPending}>
                    Save
                </Button>
            </form>
        </Form>
    );
}
