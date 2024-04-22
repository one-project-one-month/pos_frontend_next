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
import { Input } from "@/components/ui/input";
import { productFormSchema } from "@/validations/product";
import CategorySelect from "./category-select";
import { useGetProductCategories } from "@/services/api/product-categories";
import { useCreateProduct, useUpdateProduct } from "@/services/api/products";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { toast } from "sonner";

interface CreateProductFormProps {
    initialValues?: Product;
    isEditMode?: boolean;
}
export function ProductForm({ initialValues, isEditMode = false }: CreateProductFormProps) {
    const router = useRouter();
    const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
    const { data: productCategories } = useGetProductCategories();
    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            categoryCode: initialValues?.categoryCode ?? "",
            price: initialValues?.price ?? 0,
            productCode: initialValues?.productCode ?? "",
            productName: initialValues?.productName ?? "",
        },
    });

    function onSubmit(values: z.infer<typeof productFormSchema>) {
        toast.info("Making the request...", { id: "info-toast" });
        if (!isEditMode) {
            createProduct(values, {
                onSuccess: () => {
                    router.push("/products");
                },
                onError: (error) => {
                    console.error(error);
                    toast.error("Fail to create new product!");
                },
                onSettled: () => {
                    toast.dismiss("info-toast");
                }
            });
        } else if (initialValues?.productId && isEditMode) {
            updateProduct(
                { payload: values, id: initialValues.productId },
                {
                    onSuccess: () => {
                        router.push("/products");
                    },
                    onError: (error) => {
                        console.error(error);
                        toast.error("Fail to update the product!");
                    },
                    onSettled: () => {
                        toast.dismiss("info-toast");
                    }
                },
            );
        }
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
                                <Input placeholder="Enter Product Name" {...field} />
                            </FormControl>
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
                                <Input placeholder="Enter Product Code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryCode"
                    shouldUnregister
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Category Code</FormLabel>
                                <FormControl>
                                    <CategorySelect
                                        value={field.value}
                                        values={productCategoriesRes?.data.categories}
                                        setValue={form.setValue}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <Button type="submit" size="lg" disabled={isUpdating || isCreating}>
                    Save
                </Button>
            </form>
        </Form>
    );
}
