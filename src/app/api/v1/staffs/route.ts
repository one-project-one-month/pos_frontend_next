import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db/prismaClient";

/* GET /api/v1/staffs */
export async function GET(req: NextRequest) {
    const staffs = await prisma.staff.findMany();

    return NextResponse.json(staffs);
}

/* POST /api/v1/staffs */
export async function POST(req: NextRequest) {
    const body = await req.json();

    const newStaff = await prisma.staff.create({
        data: {
            staffCode: body.staffCode,
            staffName: body.staffName,
            dateOfBirth: body.dateOfBirth,
            mobileNo: body.mobileNo,
            gender: body.gender,
            address: body.address,
            position: body.position,
        },
    });

    return NextResponse.json(newStaff, { status: 201 });
}
