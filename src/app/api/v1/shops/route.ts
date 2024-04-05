import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaClient";

export async function GET(req: NextRequest) {
    const name = "mgmg";
    const newUser = await prisma.user.create({
        data: {
            name: name,
        },
    });
    return NextResponse.json(newUser, { status: 201 });
}
