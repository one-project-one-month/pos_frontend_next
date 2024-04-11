import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";

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

        // TODO: password hashing logic here

        const newStaff = await prisma.staff.create({
            data: {
                staffCode: body.staffCode,
                staffName: body.staffName,
                dateOfBirth: new Date(body.dateOfBirth),
                mobileNo: body.mobileNo,
                gender: body.gender,
                address: body.address,
                position: body.position,
                // password: hashedPassword,
                password: body.password,
            },
        });

        return NextResponse.json(
            {
                message: "success",
                data: {
                    staff: newStaff,
                },
            },
            { status: 201 },
        );
    });

    return response;
}
