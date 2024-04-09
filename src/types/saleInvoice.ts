import { z } from "zod";
import { createSaleInvoiceSchema } from "@/validations/saleInvoice";

export type CreateSaleInvoiceType = z.infer<typeof createSaleInvoiceSchema>;

export type SaleInvoiceDetailType = {
    voucherNo: string;
    productCode: string;
    quantity: number;
    price: number;
    amount: number;
};

export type InputProductType = { productCode: string; quantity: number };
