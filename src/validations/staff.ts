import { z } from "zod";

export const signInStaffSchema = z.object({
    staffCode: z.string().trim().min(1, "Staff code required."),
    password: z.string().trim().min(5),
});

export const createStaffSchema = z.object({
    staffCode: z.string().trim().min(1, "Staff code required."),
    staffName: z.string().trim().min(5, "Staff name must contain at least 5 character(s)."),
    dateOfBirth: z.coerce.date(),
    mobileNo: z.string().trim().min(1, "Mobile no required."),
    gender: z.enum(["male", "female", "other"]),
    address: z.string().trim().min(1, "Address required."),
    position: z.enum(["cashier", "admin"]),
    password: z.string().trim().min(5, "Password must contain at least 5 character(s)."),
});

export const updateStaffSchema = z.object({
    staffCode: z.string().trim().min(1, "staff code required.").optional(),
    staffName: z.string().trim().min(5).optional(),
    dateOfBirth: z.coerce.date().optional(),
    mobileNo: z.string().trim().min(1, "Mobile no required.").optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    address: z.string().trim().min(1, "Address required.").optional(),
    position: z.enum(["cashier", "admin"]).optional(),
    password: z.string().trim().min(5).optional(),
});
