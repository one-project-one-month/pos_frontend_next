import { z } from "zod";

export const createShopSchema = z.object({
    shopCode: z.string().trim().min(1),
    shopName: z.string().trim().min(1),
    mobileNo: z.string().trim().min(1),
    address: z.string().trim().min(1),
});

export const updateShopSchema = z.object({
    shopName: z.string().trim().min(1).optional(),
    mobileNo: z.string().trim().min(1).optional(),
    address: z.string().trim().min(1).optional(),
});
