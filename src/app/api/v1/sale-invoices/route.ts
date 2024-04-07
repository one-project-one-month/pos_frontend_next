import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";

import { SaleInvoiceType } from "@/types/saleInvoice";
import { createSaleInvoice, createSaleInvoiceDetails } from "./utils";

/* GET /api/v1/sale-invoices */
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

/* POST /api/v1/sale-invoices
body: {
    paymentType
    staffCode
    products
}
*/
export async function POST(req: NextRequest) {
    try {
        const body: SaleInvoiceType = await req.json();

        // making sure payment type is cash or mobile
        if (body.paymentType !== "cash" && body.paymentType !== "mobileBanking")
            return NextResponse.json({ message: "Invalid payment type" }, { status: 400 });

        const productCodes = body.products.map((p) => p.productCode);
        const products = await prisma.product.findMany({
            where: {
                productCode: {
                    in: productCodes,
                },
            },
        });

        // making sure there is no invalid product codes and duplicate product codes
        if (products.length !== productCodes.length)
            return NextResponse.json(
                { message: "Invalide product code included." },
                { status: 404 },
            );

        const voucherNo = uuid();

        // calculating total amount
        const originalTotalAmount = products.reduce((accumulator, currentValue) => {
            const p = body.products.find((p) => p.productCode === currentValue.productCode);
            return accumulator + currentValue.price * p!.quantity;
        }, 0);
        const taxAmount = originalTotalAmount * 0.05;
        const totalAmount = originalTotalAmount + taxAmount;

        const created_SaleInvoice = await createSaleInvoice({
            paymentType: body.paymentType,
            voucherNo,
            totalAmount,
            staffCode: body.staffCode,
        });

        await createSaleInvoiceDetails({
            voucherNo: created_SaleInvoice!.voucherNo,
            inputProducts: body.products,
            dbProducts: products,
        });

        const saleInvoice = await prisma.saleInvoice.findUnique({
            where: {
                saleInvoiceId: created_SaleInvoice?.saleInvoiceId,
            },
            include: {
                staff: true,
                saleInvoiceDetails: true,
            },
        });

        return NextResponse.json({ message: "success", data: { saleInvoice } }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
