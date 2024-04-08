import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

type paramsType = { params: { shopId: string } };

/* GET /api/v1/shops/:shopId */
export async function GET(req: NextRequest, { params }: { params: { shopId: string } }) {
    const response = await catchAsyncError("[SHOP_GETONE]", async () => {
        const shop = await prisma.shop.findUnique({
            where: {
                shopId: params.shopId,
            },
        });

        if (!shop) return NextResponse.json({ message: "Shop not found." }, { status: 404 });

        return NextResponse.json({
            status: "success",
            data: {
                shop,
            },
        });
    });

    return response;
}

/* PATCH /api/v1/shops/:shopId */
export async function PATCH(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[SHOP_PATCH]", async () => {
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

        return NextResponse.json({
            status: "success",
            data: {
                shop: updatedShop,
            },
        });
    });

    return response;
}

/* DELETE /api/v1/shops/:shopId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[SHOP_DELETE]", async () => {
        const deletedShop = await prisma.shop.delete({
            where: { shopId: params.shopId },
        });

        if (!deletedShop) return NextResponse.json({ message: "Shop not found." }, { status: 404 });

        return NextResponse.json(
            {
                status: "success",
                data: null,
            },
            { status: 204 },
        );
    });

    return response;
}
