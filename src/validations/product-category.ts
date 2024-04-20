import { z } from "zod";

export const productCategoryFormSchema = z.object({
    productCategoryName: z.string().min(2, {
        message: "productCategoryName must be at least 2 characters.",
    }),
    productCategoryCode: z.string().min(2, {
        message: "productCategoryCode must be at least 2 characters.",
    }),
});
