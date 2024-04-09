import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

type paramsType = { params: { invoiceId: string } };

/* GET /api/v1/sale-invoices/:invoiceId */
export async function GET(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[SALE_INVOICE_GETONE]", async () => {
        const saleInvoice = await prisma.saleInvoice.findUnique({
            where: {
                saleInvoiceId: params.invoiceId,
            },
            include: {
                staff: true,
                saleInvoiceDetails: true,
            },
        });

        if (!saleInvoice)
            return NextResponse.json({ message: "Sale invoice not found." }, { status: 404 });

        return NextResponse.json({ message: "success", data: { saleInvoice } });
    });

    return response;
}

/* DELETE /api/v1/sale-invoices/:invoiceId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[SALE_INVOICE_DELETE]", async () => {
        const deletedSaleInvoice = await prisma.saleInvoice.delete({
            where: {
                saleInvoiceId: params.invoiceId,
            },
        });

        if (!deletedSaleInvoice)
            return NextResponse.json({ message: "Sale invoice not found." }, { status: 404 });

        return NextResponse.json(
            {
                message: "success",
                data: null,
            },
            { status: 204 },
        );
    });

    return response;
}
