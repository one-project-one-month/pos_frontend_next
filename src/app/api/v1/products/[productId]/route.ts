import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";

import { updateProductSchema } from "@/validations/product";

type paramsType = { params: { productId: string } };

/* GET /api/v1/products/:productId */
export async function GET(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[PRODUCT_GETONE]", async () => {
        const product = await prisma.product.findUnique({
            where: {
                productId: params.productId,
            },
        });

        if (!product) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "success", data: { product } }, { status: 200 });
    });

    return response;
}

/* PATCH /api/v1/products/:productId */
export async function PATCH(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[PRODUCT_PATCH]", async () => {
        const body = await req.json();

        const validation = updateProductSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const updatedProduct = await prisma.product.update({
            where: {
                productId: params.productId,
            },
            data: validation.data,
        });

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }

        return NextResponse.json(
            { message: "success", data: { product: updatedProduct } },
            { status: 200 },
        );
    });

    return response;
}

export async function DELETE(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[PRODUCT_DELETE]", async () => {
        const deletedProduct = await prisma.product.delete({
            where: { productId: params.productId },
        });

        if (!deletedProduct) {
            return NextResponse.json({ message: "Product not found." }, { status: 404 });
        }

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
