import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";
import { handler } from "./utils";

import { createProductSchema } from "@/validations/product";

/* GET /api/v1/products */
export async function GET(req: NextRequest) {
    const response = await catchAsyncError("[PRODUCT_GETMANY]", async () => {
        const searchParams = req.nextUrl.searchParams;
        const products = await handler({ searchParams });

        return NextResponse.json(
            { message: "success", result: products?.length, data: { products } },
            { status: 200 },
        );
    });

    return response;
}

/* POST /api/v1/products */
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[PRODUCT_POST]", async () => {
        const body = await req.json();

        const validation = createProductSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const newProduct = await prisma.product.create({
            data: validation.data,
        });

        return NextResponse.json(
            { message: "success", data: { product: newProduct } },
            { status: 201 },
        );
    });

    return response;
}
