import { NextRequest, NextResponse } from "next/server";

import prisma, { exclude } from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { createStaffSchema } from "@/validations/staff";
import { hashPassword } from "./utils";

/* GET /api/v1/staffs */
export async function GET(req: NextRequest) {
    const response = await catchAsyncError("[STAFF_GETMANY]", async () => {
        const staffs = await prisma.staff.findMany();

        if (staffs.length < 1)
            return NextResponse.json(
                { message: "No staff found! You need to create one first" },
                {
                    status: 404,
                },
            );

        return NextResponse.json({
            message: "success",
            result: staffs.length,
            data: {
                staffs,
            },
        });
    });

    return response;
}

/* POST /api/v1/staffs */
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[STAFF_POST]", async () => {
        const body = await req.json();

        const validation = createStaffSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid staff inputs.", error: validation.error.format() },
                { status: 400 },
            );

        const hashed_password = await hashPassword(validation.data.password);
        const newStaff = await prisma.staff.create({
            data: { ...validation.data, password: hashed_password },
        });

        return NextResponse.json(
            {
                message: "success",
                data: { staff: exclude(newStaff, "password") },
            },
            { status: 201 },
        );
    });

    return response;
}
