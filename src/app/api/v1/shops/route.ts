import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

import { createShopSchema } from "@/validations/shop";

/* GET /api/v1/shops */
export async function GET() {
    const response = await catchAsyncError("[SHOP_GETMANY]", async () => {
        const shops = await prisma.shop.findMany();

        if (shops.length < 1)
            return new NextResponse("No shop found! You need to create one first", { status: 404 });

        return NextResponse.json({
            message: "success",
            result: shops.length,
            data: {
                shops,
            },
        });
    });

    return response;
}

/* POST /api/v1/shops */
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[SHOP_POST]", async () => {
        const body = await req.json();

        const validation = createShopSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const newShop = await prisma.shop.create({
            data: validation.data,
        });

        return NextResponse.json(
            {
                message: "success",
                data: {
                    shop: newShop,
                },
            },
            { status: 201 },
        );
    });

    return response;
}
