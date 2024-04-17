import prisma from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

import { catchAsyncError } from "@/lib/errorhandler";
import { createSaleInvoiceSchema } from "@/validations/saleInvoice";
import { createSaleInvoice, createSaleInvoiceDetails, getSaleInvoicesByRange } from "./utils";

/* GET /api/v1/sale-invoices
query ?start=year-month-day&end=year-month=day (2024-01-01)
      ?month=month (01)
*/
export async function GET(req: NextRequest) {
    const response = await catchAsyncError("[SALE_INVOICE_GETMAN]", async () => {
        const searchParams = req.nextUrl.searchParams;
        const start = searchParams.get("start");
        const end = searchParams.get("end");
        const month = searchParams.get("month");
        const year = searchParams.get("year");

        console.log(start, end);
        // making sure start and end date are valid
        if (start && end && new Date(start).getTime() > new Date(end).getTime())
            return NextResponse.json({ message: "Invalid date range." }, { status: 400 });

        const saleInvoices = await getSaleInvoicesByRange({ start, end, month, year });

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
        const totalAmount = products.reduce((accumulator: any, currentValue: any) => {
            const p = validation.data.products.find(
                (p) => p.productCode === currentValue.productCode,
            );
            return accumulator + currentValue.price * p!.quantity;
        }, 0);
        const taxAmount = totalAmount * 0.05;
        const paymentAmount = totalAmount + taxAmount;

        const created_SaleInvoice = await createSaleInvoice({
            voucherNo,
            totalAmount,
            paymentAmount,
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
