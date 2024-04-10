import prisma from "@/db/prismaClient";

import type { InputProductType, SaleInvoiceDetailType } from "@/types/saleInvoice";
import type { Product } from "@prisma/client";

export async function getSaleInvoicesByRange({
    start,
    end,
    month,
    year,
}: {
    start: string | null;
    end: string | null;
    month: string | null;
    year: string | null;
}) {
    const currentYear = new Date().getFullYear();
    let whereClause = {};

    if (start && end) {
        whereClause = {
            dateTime: {
                gte: new Date(start),
                lte: new Date(end),
            },
        };
    } else if (month) {
        whereClause = {
            dateTime: {
                gte: new Date(currentYear, Number(month) - 1, 1),
                lte: new Date(currentYear, Number(month), 0),
            },
        };
    } else if (year) {
        whereClause = {
            dateTime: {
                gte: new Date(Number(year), 0, 1),
                lte: new Date(Number(year), 11, 31),
            },
        };
    }

    console.log(whereClause);

    return prisma.saleInvoice.findMany({
        where: whereClause,
        include: { staff: true, saleInvoiceDetails: true },
    });
}

export async function createSaleInvoice({
    voucherNo,
    totalAmount,
    paymentAmount,
    staffCode,
}: {
    voucherNo: string;
    totalAmount: number;
    paymentAmount: number;
    staffCode: string;
}) {
    return prisma.saleInvoice.create({
        data: {
            voucherNo,
            totalAmount,
            paymentAmount,
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
