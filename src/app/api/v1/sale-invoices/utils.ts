import prisma from "@/db/prismaClient";

import type { Product, PaymentType } from "@prisma/client";
import type { SaleInvoiceDetailType, InputProductType } from "@/types/saleInvoice";

export async function createSaleInvoice({
    paymentType,
    voucherNo,
    totalAmount,
    staffCode,
}: {
    paymentType: PaymentType;
    voucherNo: string;
    totalAmount: number;
    staffCode: string;
}) {
    // create sale invoice according to payment type
    if (paymentType === "cash") {
        return prisma.saleInvoice.create({
            data: {
                paymentType: paymentType,
                voucherNo,
                totalAmount,
                staffCode: staffCode,
            },
        });
    } else if (paymentType === "mobileBanking") {
        return prisma.saleInvoice.create({
            data: {
                paymentType: paymentType,
                voucherNo,
                totalAmount,
                staffCode: staffCode,
            },
        });
    }
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
    await prisma.saleInvoiceDetails.createMany({ data: saleInvoiceDetailsInputs });

    // finding sale invoice details
    return prisma.saleInvoiceDetails.findMany({
        where: {
            voucherNo,
        },
    });
}
