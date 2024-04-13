import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { exclude } from "@/db/prismaClient";
import { signInStaffSchema } from "@/validations/staff";
import { comparePassword, generateToken } from "../utils";

const cookiesExpiredIn = Number(process.env.JWT_COOKIE_EXPIRES_IN) ?? 90;

/* POST /api/v1/staffs/sign-in */
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[SIGN_IN]", async () => {
        const body = await req.json();

        const validation = signInStaffSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", error: validation.error.format() },
                { status: 400 },
            );

        const staff = await prisma.staff.findUnique({
            where: {
                staffCode: validation.data.staffCode,
            },
        });

        if (!staff) return NextResponse.json({ message: "Staff not found." }, { status: 404 });

        const match = await comparePassword(validation.data.password, staff.password);
        if (match) {
            const token = generateToken({
                staffCode: staff.staffCode,
                staffId: staff.staffId,
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
                    data: { token, staff: exclude(staff, "password") },
                },
                { status: 200 },
            );
        } else return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    });

    return response;
}
