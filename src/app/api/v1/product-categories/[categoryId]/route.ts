import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prismaClient";

type paramsType = { params: { categoryId: string } };

/* GET /api/v1/product-categories/:categoryId */
export async function GET(req: NextRequest, { params }: paramsType) {
    const productCategory = await prisma.productCategory.findUnique({
        where: {
            productCategoryId: params.categoryId,
        },
    });

    if (!productCategory)
        return NextResponse.json({ message: "Product category not found." }, { status: 404 });

    return NextResponse.json(productCategory);
}

/* PUT /api/v1/product-categories/:categoryId */
export async function PUT(req: NextRequest, { params }: paramsType) {
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

    return NextResponse.json(updatedCategory);
}

/* DELETE /api/v1/product-categories/:categoryId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    const deletedCategory = await prisma.productCategory.delete({
        where: { productCategoryId: params.categoryId },
    });

    if (!deletedCategory)
        return NextResponse.json({ message: "Product category not found." }, { status: 404 });

    return NextResponse.json({
        message: "Product category deleted.",
        productCategoryId: deletedCategory.productCategoryId,
    });
}
