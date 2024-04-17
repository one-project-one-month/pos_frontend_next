import { z } from "zod";
import { signInStaffSchema, updateStaffSchema, createStaffSchema } from "@/validations/staff";

export type SignInStaffType = z.infer<typeof signInStaffSchema>;
export type UpdateStaffType = z.infer<typeof updateStaffSchema>;
export type CreateStaffType = z.infer<typeof createStaffSchema>;
