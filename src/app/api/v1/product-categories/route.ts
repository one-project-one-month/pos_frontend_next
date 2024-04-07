import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";

/* GET /api/v1/product-categories */
export async function GET(req: NextRequest) {
    const categories = await prisma.productCategory.findMany();

    return NextResponse.json(categories);
}

/* POST /api/v1/product-categories */
export async function POST(req: NextRequest) {
    const body = await req.json();

    const newCategory = await prisma.productCategory.create({
        data: {
            productCategoryName: body.productCategoryName,
            productCategoryCode: body.productCategoryCode,
        },
    });

    return NextResponse.json(newCategory, { status: 201 });
}
