import prisma from "@/db/prismaClient";
import { NextRequest, NextResponse } from "next/server";

type paramsType = { params: { categoryId: string } };

/* GET /api/v1/product-categories/:categoryId */
export async function GET(req: NextRequest, { params }: paramsType) {
    try {
        const productCategory = await prisma.productCategory.findUnique({
            where: {
                productCategoryId: params.categoryId,
            },
        });

        if (!productCategory)
            return NextResponse.json({ message: "Product category not found." }, { status: 404 });

        return NextResponse.json(productCategory, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Can't get the category." }, { status: 500 });
    }
}

/* PUT /api/v1/product-categories/:categoryId */
export async function PUT(req: NextRequest, { params }: paramsType) {
    try {
        const body = await req.json();

        const updatedCategory = await prisma.productCategory.update({
            where: {
                productCategoryId: params.categoryId,
            },
            data: {
                productCategoryName: body.productCategoryName,
                productCategoryCode: body.productCategoryCode,
            },
        });

        if (!updatedCategory)
            return NextResponse.json({ message: "Product category not found." }, { status: 404 });

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Can't update the category." }, { status: 500 });
    }
}

/* DELETE /api/v1/product-categories/:categoryId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    try {
        const deletedCategory = await prisma.productCategory.delete({
            where: { productCategoryId: params.categoryId },
        });

        if (!deletedCategory)
            return NextResponse.json({ message: "Product category not found." }, { status: 404 });

        return NextResponse.json(
            {
                message: "Product category deleted.",
                productCategoryId: deletedCategory.productCategoryId,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json({ message: "Can't delete the category." }, { status: 500 });
    }
}
