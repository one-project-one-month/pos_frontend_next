import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Position } from "@prisma/client";

const jwtSecret = process.env.JWT_SECRET ?? "";
const cookiesExpiredIn = Number(process.env.JWT_COOKIE_EXPIRES_IN) ?? 90;

const signToken = (payload: { staffCode: string; staffName: string; position: Position }) =>
    jwt.sign(payload, jwtSecret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

/* POST /api/v1/sign-in */
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[SIGN_IN]", async () => {
        const body = await req.json();

        const staff = await prisma.staff.findUnique({
            where: {
                staffCode: body.staffCode,
            },
        });

        // TODO: compare with the hashed password
        if (!staff)
            return NextResponse.json(
                { message: "Staff Code or password is incorrect!" },
                {
                    status: 401,
                },
            );

        const token = signToken({
            staffCode: staff.staffCode,
            staffName: staff.staffName,
            position: staff.position,
        });

        cookies().set("jwt", token, {
            expires: new Date(Date.now() + cookiesExpiredIn * 24 * 3600 * 1000),
            httpOnly: true,
        });

        return NextResponse.json(
            {
                message: "success",
                token,
                data: {
                    staff,
                },
            },
            { status: 200 },
        );
    });

    return response;
}
