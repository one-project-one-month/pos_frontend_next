import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

/* GET /api/v1/shops */
export async function GET(req: NextRequest) {
    const response = await catchAsyncError("[SHOP_GETMANY]", async () => {
        const shops = await prisma.shop.findMany();

        if (shops.length < 1)
            return new NextResponse("No shop found! You need to create one first", { status: 404 });

        return NextResponse.json({
            status: "success",
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

        const newShop = await prisma.shop.create({
            data: {
                shopCode: body.shopCode,
                shopName: body.shopName,
                mobileNo: body.mobileNo,
                address: body.address,
            },
        });

        return NextResponse.json(
            {
                status: "success",
                data: {
                    shop: newShop,
                },
            },
            { status: 201 },
        );
    });

    return response;
}
