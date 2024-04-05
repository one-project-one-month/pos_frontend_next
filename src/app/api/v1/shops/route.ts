import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaClient";

/* GET /api/v1/shops */
export async function GET(req: NextRequest) {
    const shops = await prisma.shop.findMany();

    return NextResponse.json(shops);
}

/* POST /api/v1/shops */
export async function POST(req: NextRequest) {
    const body = await req.json();

    const newShop = await prisma.shop.create({
        data: {
            shopCode: body.shopCode,
            shopName: body.shopName,
            mobileNo: body.mobileNo,
            address: body.address,
        },
    });

    return NextResponse.json(newShop, { status: 201 });
}
