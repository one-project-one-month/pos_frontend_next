import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";

type paramsType = { params: { shopId: string } };

/* GET /api/v1/shops/:shopId */
export async function GET(req: NextRequest, { params }: { params: { shopId: string } }) {
    const shop = await prisma.shop.findUnique({
        where: {
            shopId: params.shopId,
        },
    });

    if (!shop) return NextResponse.json({ message: "Shop not found." }, { status: 404 });

    return NextResponse.json(shop);
}

/* PUT /api/v1/shops/:shopId */
export async function PUT(req: NextRequest, { params }: paramsType) {
    const body = await req.json();

    const updatedShop = await prisma.shop.update({
        where: {
            shopId: params.shopId,
        },
        data: {
            shopCode: body.shopCode,
            shopName: body.shopName,
        },
    });

    if (!updatedShop) return NextResponse.json({ message: "Shop not found." }, { status: 404 });

    return NextResponse.json(updatedShop);
}

/* DELETE /api/v1/shops/:shopId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    const deletedShop = await prisma.shop.delete({
        where: { shopId: params.shopId },
    });

    if (!deletedShop) return NextResponse.json({ message: "Shop not found." }, { status: 404 });

    return NextResponse.json({
        message: "Shop deleted.",
        productCategoryId: deletedShop.shopId,
    });
}
