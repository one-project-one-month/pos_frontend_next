import { z } from "zod";

export const createCustomerSchema = z.object({
    customerCode: z.string().trim(),
    customerName: z.string().trim(),
    customerDOB: z.coerce.date(),
    customerGender: z.enum(["male", "female", "other"]),
    customerMobilNo: z.string().trim(),
    cusotmerStateCode: z.number(),
    customerTownShipCode: z.number(),
});

export const updateCustomerSchema = z.object({
    customerName: z.string().trim().optional(),
    customerDOB: z.coerce.date().optional(),
    customerGender: z.enum(["male", "female", "other"]).optional(),
    customerMobilNo: z.string().trim().optional(),
    cusotmerStateCode: z.number().optional(),
    customerTownShipCode: z.number().optional(),
});
