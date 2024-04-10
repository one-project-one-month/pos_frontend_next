import { z } from "zod";

export const paymentSchema = z.object({
    voucherNo: z.string().trim().min(1, "Voucher No is requied"),
    receiveAmount: z.number().gt(0),
    paymentType: z.string(),
});
