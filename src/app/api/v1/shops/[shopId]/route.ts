import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

import { updateShopSchema } from "@/validations/shop";

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
            message: "success",
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

        const validation = updateShopSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const updatedShop = await prisma.shop.update({
            where: {
                shopId: params.shopId,
            },
            data: validation.data,
        });

        if (!updatedShop) return NextResponse.json({ message: "Shop not found." }, { status: 404 });

        return NextResponse.json({
            message: "success",
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
        console.log(params.shopId);
        const deletedShop = await prisma.shop.delete({
            where: { shopId: params.shopId },
        });

        if (!deletedShop) return NextResponse.json({ message: "Shop not found." }, { status: 404 });

        return NextResponse.json(
            {
                message: "success",
                data: null,
            },
            { status: 202 },
        );
    });

    return response;
}
