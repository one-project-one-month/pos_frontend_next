import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { paymentSchema } from "@/validations/payment";
import { NextRequest, NextResponse } from "next/server";

/* PATCH /api/v1/payment */
export async function PATCH(req: NextRequest) {
    const response = await catchAsyncError("[PAYMENT]", async () => {
        const body = await req.json();

        const validation = paymentSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const { voucherNo, receiveAmount, paymentType } = validation.data;

        const saleInvoice = await prisma.saleInvoice.findUnique({
            where: {
                voucherNo,
            },
        });

        if (!saleInvoice)
            return NextResponse.json(
                { message: "Sale invoice not found with this voucher no." },
                { status: 404 },
            );

        if (receiveAmount < saleInvoice.paymentAmount)
            return NextResponse.json(
                { message: "Receive amount is less than the actual payment amount" },
                { status: 400 },
            );

        const paidInvoice = await prisma.saleInvoice.update({
            where: {
                saleInvoiceId: saleInvoice.saleInvoiceId,
            },
            data: {
                receiveAmount,
                paymentType,
                change: receiveAmount - saleInvoice.paymentAmount,
            },
        });

        return NextResponse.json({ message: "success", data: { saleInvoice: paidInvoice } });
    });

    return response;
}
