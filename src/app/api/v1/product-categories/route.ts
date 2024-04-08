import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

/* GET /api/v1/product-categories */
export async function GET() {
    const response = await catchAsyncError("[CATEGORY_GETMANY]", async () => {
        const categories = await prisma.productCategory.findMany();

        return NextResponse.json(categories, { status: 200 });
    });

    return response;
}

/* POST /api/v1/product-categories */
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[CATEGORY_POST]", async () => {
        const body = await req.json();
        const newCategory = await prisma.productCategory.create({
            data: {
                productCategoryName: body.productCategoryName,
                productCategoryCode: body.productCategoryCode,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    });

    return response;
}
