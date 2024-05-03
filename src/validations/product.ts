import { z } from "zod";

export const productFormSchema = z.object({
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
});

export const createProductSchema = z.object({
    productName: z.string().min(2),
    price: z.number().nonnegative().min(10),
    productCode: z.string().min(2),
    categoryCode: z.string().min(2),
});

export const updateProductSchema = z.object({
    productName: z.string().min(2).optional(),
    price: z.number().nonnegative().min(10).optional(),
    categoryCode: z.string().min(2).optional(),
});
