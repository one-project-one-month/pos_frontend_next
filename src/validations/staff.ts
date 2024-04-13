import { z } from "zod";

export const signInStaffSchema = z.object({
    staffCode: z.string().trim().min(1, "Staff code required."),
    password: z.string().trim().min(5),
});

export const createStaffSchema = z.object({
    staffCode: z.string().trim().min(1, "staff code required."),
    staffName: z.string().trim().min(5),
    dateOfBirth: z.coerce.date(),
    mobileNo: z.string().trim().min(1, "Mobile no required."),
    gender: z.enum(["male", "female", "other"]),
    address: z.string().trim().min(1, "Address required."),
    position: z.enum(["cashier", "admin"]),
    password: z.string().trim().min(5),
});
