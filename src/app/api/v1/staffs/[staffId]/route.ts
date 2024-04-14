import { NextRequest, NextResponse } from "next/server";
import prisma, { exclude } from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { updateStaffSchema } from "@/validations/staff";
import { hashPassword } from "../utils";
import { Staff } from "@prisma/client";

type paramsType = { params: { staffId: string } };

/* GET /api/v1/staffs/:staffId */
export async function GET(req: NextRequest, { params }: { params: { staffId: string } }) {
    const response = await catchAsyncError("[STAFF_GETONE]", async () => {
        const staff = await prisma.staff.findUnique({
            where: {
                staffId: params.staffId,
            },
        });

        if (!staff) return NextResponse.json({ message: "Staff not found." }, { status: 404 });

        return NextResponse.json({
            message: "success",
            data: {
                staff,
            },
        });
    });

    return response;
}

/* PATCH /api/v1/staffs/:staffId */
export async function PATCH(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[STAFF_PATCH]", async () => {
        const body = (await req.json()) as Staff;

        const validation = updateStaffSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid staff inputs.", error: validation.error.format() },
                { status: 400 },
            );

        if (validation.data.password) {
            validation.data.password = await hashPassword(validation.data.password);
        }

        const updatedStaff = await prisma.staff.update({
            where: {
                staffId: params.staffId,
            },
            data: validation.data,
        });

        if (!updatedStaff)
            return NextResponse.json({ message: "Staff not found." }, { status: 404 });

        return NextResponse.json({
            message: "success",
            data: {
                staff: exclude(updatedStaff, "password"),
            },
        });
    });

    return response;
}

/* DELETE /api/v1/staffs/:staffId */
export async function DELETE(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[STAFF_DELETE]", async () => {
        const deletedStaff = await prisma.staff.delete({
            where: { staffId: params.staffId },
        });

        if (!deletedStaff)
            return NextResponse.json({ message: "Staff not found." }, { status: 404 });

        return NextResponse.json(
            {
                message: "success",
                data: null,
            },
            { status: 200 },
        );
    });

    return response;
}
