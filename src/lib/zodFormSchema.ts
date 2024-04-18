import { $Enums } from "@prisma/client";
import { z } from "zod";

export const productCategoryFormSchema = z.object({
    productCategoryName: z.string().min(2, {
        message: "productCategoryName must be at least 2 characters.",
    }),
    productCategoryCode: z.string().min(2, {
        message: "productCategoryCode must be at least 2 characters.",
    }),
});
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

export const staffFormSchema = z.object({
    staffCode: z.string().min(2, {
        message: "Staff code must be at least 2 characters.",
    }),
    staffName: z.string().min(2, {
        message: "Staff name must be at least 2 characters.",
    }),
    dateOfBirth: z.date({
        required_error: "A date of birth is required.",
    }),
    mobileNo: z.string().min(5, {
        message: "Mobile number must be at least 5 characters.",
    }),
    address: z.string(),
    gender: z.nativeEnum($Enums.Gender),
    position: z.nativeEnum($Enums.Position),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});
