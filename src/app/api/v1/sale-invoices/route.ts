import prisma from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

import { catchAsyncError } from "@/lib/errorhandler";
import { createSaleInvoiceSchema } from "@/validations/saleInvoice";
import { createSaleInvoice, createSaleInvoiceDetails } from "./utils";

/* GET /api/v1/sale-invoices */
export async function GET() {
    const response = await catchAsyncError("[SALE_INVOICE_GETMAN]", async () => {
        const saleInvoices = await prisma.saleInvoice.findMany({
            include: { staff: true, saleInvoiceDetails: true },
        });

        return NextResponse.json({
            message: "success",
            result: saleInvoices.length,
            data: { saleInvoices },
        });
    });

    return response;
}

/* POST /api/v1/sale-invoices
body: {
    staffCode
    products
}
*/
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[SALE_INVOICE_POST]", async () => {
        const body = await req.json();

        const validation = createSaleInvoiceSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const staff = await prisma.staff.findUnique({
            where: { staffCode: validation.data.staffCode },
        });

        // making sure that staff code is valid
        if (!staff) return NextResponse.json({ message: "Staff not found." }, { status: 404 });

        const productCodes = validation.data.products.map((p) => p.productCode);
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
                { message: "Invalid product code(s) included." },
                { status: 404 },
            );

        const voucherNo = uuid();

        // calculating total amount
        const originalTotalAmount = products.reduce((accumulator: any, currentValue: any) => {
            const p = validation.data.products.find(
                (p) => p.productCode === currentValue.productCode,
            );
            return accumulator + currentValue.price * p!.quantity;
        }, 0);
        const taxAmount = originalTotalAmount * 0.05;
        const totalAmount = originalTotalAmount + taxAmount;

        const created_SaleInvoice = await createSaleInvoice({
            voucherNo,
            totalAmount,
            staffCode: validation.data.staffCode,
        });

        await createSaleInvoiceDetails({
            voucherNo: created_SaleInvoice!.voucherNo,
            inputProducts: validation.data.products,
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
    });

    return response;
}
