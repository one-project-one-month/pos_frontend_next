import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";

type paramsType = { params: { invoiceId: string } };

/* GET /api/v1/sale-invoices/:invoiceId */
export async function GET(req: NextRequest, { params }: paramsType) {
    try {
        const saleInvoice = await prisma.saleInvoice.findUnique({
            where: {
                saleInvoiceId: params.invoiceId,
            },
        });

        if (!saleInvoice)
            return NextResponse.json({ message: "Sale invoice not found." }, { status: 404 });

        return NextResponse.json({ message: "success", data: { saleInvoice } });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}

/* DELETE /api/v1/sale-invoices/:invoiceId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    try {
        const deletedSaleInvoice = await prisma.saleInvoice.delete({
            where: {
                saleInvoiceId: params.invoiceId,
            },
        });

        return NextResponse.json({
            message: "success",
            data: { saleInvoiceId: deletedSaleInvoice.saleInvoiceId },
        });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
