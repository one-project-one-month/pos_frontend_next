import prisma from "@/db/prismaClient";

import type { InputProductType, SaleInvoiceDetailType } from "@/types/saleInvoice";
import type { Product } from "@prisma/client";

export async function createSaleInvoice({
    voucherNo,
    totalAmount,
    staffCode,
}: {
    voucherNo: string;
    totalAmount: number;
    staffCode: string;
}) {
    return prisma.saleInvoice.create({
        data: {
            voucherNo,
            totalAmount,
            staffCode,
        },
    });
}

export async function createSaleInvoiceDetails({
    voucherNo,
    inputProducts,
    dbProducts,
}: {
    voucherNo: string;
    inputProducts: InputProductType[];
    dbProducts: Product[];
}) {
    // creating sale invoice details data
    const saleInvoiceDetailsInputs: SaleInvoiceDetailType[] = dbProducts.map((product) => {
        const p = inputProducts.find((p) => p.productCode === product.productCode);

        return {
            voucherNo,
            productCode: product.productCode,
            price: product.price,
            quantity: p!.quantity,
            amount: product.price * p!.quantity,
        };
    });
    return prisma.saleInvoiceDetails.createMany({ data: saleInvoiceDetailsInputs });
}
