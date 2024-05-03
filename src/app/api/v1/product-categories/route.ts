import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

import { createProductCategorySchema } from "@/validations/product-category";

/* GET /api/v1/product-categories */
export async function GET() {
    const response = await catchAsyncError("[CATEGORY_GETMANY]", async () => {
        const categories = await prisma.productCategory.findMany();

        return NextResponse.json(
            { message: "success", result: categories.length, data: { categories } },
            { status: 200 },
        );
    });

    return response;
}

/* POST /api/v1/product-categories */
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[CATEGORY_POST]", async () => {
        const body = await req.json();

        const validation = createProductCategorySchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const newCategory = await prisma.productCategory.create({
            data: validation.data,
        });

        return NextResponse.json(
            {
                message: "success",
                data: {
                    category: newCategory,
                },
            },
            { status: 201 },
        );
    });

    return response;
}
