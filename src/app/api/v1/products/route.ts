import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const response = await catchAsyncError("[PRODUCT_GETMANY]", async () => {
        const products = await prisma.product.findMany();

        return NextResponse.json(products, { status: 200 });
    });

    return response;
}

export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[PRODUCT_POST]", async () => {
        const body = await req.json();
        const newProduct = await prisma.product.create({
            data: {
                productCode: body.productCode,
                productName: body.productName,
                price: body.price,
                category: {
                    connect: {
                        productCategoryCode: body.categoryCode,
                    },
                },
                saleInvoiceDetails: body?.saleInvoiceDetails,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    });

    return response;
}
