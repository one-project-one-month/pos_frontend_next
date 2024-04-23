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
import { productCategoryFormSchema } from "@/validations/product-category";
import {
    useCreateProductCategory,
    useEditProductCategory,
} from "@/services/api/product-categories";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@prisma/client";
import { toast } from "sonner";

interface ProductCategoryFormProps {
    initialValues?: ProductCategory;
    isEditMode?: boolean;
}
export function ProductCategoryForm({ initialValues, isEditMode }: ProductCategoryFormProps) {
    const router = useRouter();
    const { mutate: createProductCategory, isPending: isCreating } = useCreateProductCategory();
    const { mutate: editProductCategory, isPending: isEditing } = useEditProductCategory();
    const form = useForm<z.infer<typeof productCategoryFormSchema>>({
        resolver: zodResolver(productCategoryFormSchema),
        defaultValues: {
            productCategoryCode: initialValues?.productCategoryCode ?? "",
            productCategoryName: initialValues?.productCategoryName ?? "",
        },
    });

    function onSubmit(values: z.infer<typeof productCategoryFormSchema>) {
        toast.info("Making the request...", { id: "info-toast" });
        if (!isEditMode) {
            createProductCategory(values, {
                onSuccess: () => {
                    router.push("/product-categories");
                },
                onError: (error) => {
                    console.error(error);
                    toast.error("Fail to create new category!");
                },
                onSettled: () => {
                    toast.dismiss("info-toast");
                },
            });
        } else if (isEditMode && initialValues) {
            editProductCategory(
                {
                    payload: values,
                    cid: initialValues.productCategoryId,
                },
                {
                    onSuccess: () => {
                        router.push("/product-categories");
                    },
                    onError: (error) => {
                        console.error(error);
                        toast.error("Fail to update the category!");
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="productCategoryName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Product Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Name" {...field} />
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
                            <FormLabel className="text-base">Product Category Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Code" {...field} />
                            </FormControl>
                            <FormDescription>Unique code for the category</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isCreating || isEditing} size="lg">
                    Save
                </Button>
            </form>
        </Form>
    );
}
