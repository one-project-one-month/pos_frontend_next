import { z } from "zod";

export const createSaleInvoiceSchema = z.object({
    staffCode: z.string().trim().min(1, "Staff code required."),
    products: z.array(
        z.object({
            productCode: z.string().trim().min(1, "Product code required."),
            quantity: z.number().gt(0),
        }),
    ),
});
