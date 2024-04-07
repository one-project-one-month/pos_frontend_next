import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";

/* GET /api/v1/product-categories */
export async function GET() {
    try {
        const categories = await prisma.productCategory.findMany();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Error fetching product categories:", error);
        return NextResponse.json(
            { message: "Failed to fetch product categories" },
            { status: 500 },
        );
    }
}

/* POST /api/v1/product-categories */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newCategory = await prisma.productCategory.create({
            data: {
                productCategoryName: body.productCategoryName,
                productCategoryCode: body.productCategoryCode,
            },
        });
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error creating product category:", error);
        return NextResponse.json({ message: "Failed to create product category" }, { status: 500 });
    }
}
