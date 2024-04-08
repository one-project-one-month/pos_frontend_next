import prisma from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";

type paramsType = { params: { productId: string } };

export async function GET(req: NextRequest, { params }: paramsType) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                productId: params.productId,
            },
        });
        if (!product) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Can't get the product." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: paramsType) {
    try {
        const body = await req.json();

        const updatedProduct = await prisma.product.update({
            where: {
                productId: params.productId,
            },
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
        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }
        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Can't update the product." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: paramsType) {
    try {
        const deletedProduct = await prisma.product.delete({
            where: { productId: params.productId },
        });
        if (!deletedProduct) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }
        return NextResponse.json(deletedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Can't delete the product." }, { status: 500 });
    }
}
