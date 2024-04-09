import { z } from "zod";

export const productCategoryFormSchema = {
    create: z.object({
        productCategoryName: z.string().min(2, {
            message: "productCategoryName must be at least 2 characters.",
        }),
        productCategoryCode: z.string().min(2, {
            message: "productCategoryCode must be at least 2 characters.",
        }),
    }),
    update: z.object({
        productCategoryName: z.string().min(2, {
            message: "productCategoryName must be at least 2 characters.",
        }),
    }),
};
/*
   {
            categoryCode: "pc1",
            price: 10000,
            productCode: "p1",
            productId: "1",
            productName: "t-shirt",
        },
*/
export const productFormSchema = {
    create: z.object({
        productName: z.string().min(2, {
            message: "Product category name must be at least 2 characters.",
        }),
        price: z.number().nonnegative({ message: "negative value not allow" }).min(10),
        productCode: z.string().min(2, {
            message: "Product code must be at least 2 characters.",
        }),
        categoryCode: z.string().min(2, {
            message: "Product category code must be at least 2 characters.",
        }),
    }),
    update: z.object({
        productName: z.string().min(2, {
            message: "Product category name must be at least 2 characters.",
        }),
        price: z.number().nonnegative({ message: "negative value not allow" }).min(10),
        productCode: z.string().min(2, {
            message: "Product code must be at least 2 characters.",
        }),
        categoryCode: z.string().min(2, {
            message: "Product category code must be at least 2 characters.",
        }),
    }),
};
