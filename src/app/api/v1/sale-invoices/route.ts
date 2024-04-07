import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { PaymentType } from "@prisma/client";

import { SaleInvoiceDetailType } from "@/types/saleInvoice";

export async function GET(req: NextRequest) {
    try {
        const saleInvoices = await prisma.saleInvoice.findMany({
            include: { staff: true, saleInvoiceDetails: true },
        });

        return NextResponse.json({ message: "success", data: { saleInvoices } });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body: {
            paymentType: PaymentType;
            staffCode: string;
            products: { productCode: string; quantity: number }[];
        } = await req.json();

        const voucherNo = uuid();
        let totalAmount = 0;
        const saleInvoiceDetailsInputs: SaleInvoiceDetailType[] = [];

        body.products.forEach(async (product) => {
            const p = await prisma.product.findUnique({
                where: { productCode: product.productCode },
                select: { price: true },
            });

            if (!p)
                return NextResponse.json(
                    { message: `Product ${product.productCode} not found.` },
                    { status: 404 },
                );

            saleInvoiceDetailsInputs.push({
                voucherNo,
                productCode: product.productCode,
                quantity: product.quantity,
                price: p.price,
                amount: product.quantity * p.price,
            });

            totalAmount += product.quantity * p.price;
        });

        await prisma.saleInvoiceDetails.createMany({ data: saleInvoiceDetailsInputs });

        const saleInvoice = await prisma.saleInvoice.create({
            data: {
                paymentType: body.paymentType,
                voucherNo,
                totalAmount,
                staffCode: body.staffCode,
            },
        });

        const saleInvoiceDetails = await prisma.saleInvoiceDetails.findMany({
            where: {
                voucherNo: saleInvoice.voucherNo,
            },
            include: {
                product: true,
            },
        });

        return NextResponse.json(
            { message: "success", data: { saleInvoice, saleInvoiceDetails } },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
