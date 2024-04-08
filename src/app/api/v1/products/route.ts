import prisma from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
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
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Can not create the product" }, { status: 500 });
    }
}
