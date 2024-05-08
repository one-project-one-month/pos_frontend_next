import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";

import { updateCustomerSchema } from "@/validations/customer";

type paramsType = { params: { customerId: string } };

/* GET /api/v1/customer/:customerId */
export async function GET(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[CUSTOMER_GETONE]", async () => {
        const customer = await prisma.customer.findUnique({
            where: {
                customerId: params.customerId,
            },
        });

        if (!customer) {
            return NextResponse.json({ message: "Customer not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "success", data: { customer } }, { status: 200 });
    });
    return response;
}

/* PATCH /api/v1/customer/:customerId */
export async function PATCH(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[CUSTOMER_PATCH]", async () => {
        const body = await req.json();

        const validation = updateCustomerSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const updatedCustomer = await prisma.customer.update({
            where: {
                customerId: params.customerId,
            },
            data: validation.data,
        });

        if (!updatedCustomer) {
            return NextResponse.json({ message: "Customer not found." }, { status: 404 });
        }

        return NextResponse.json(
            { message: "success", data: { customer: updatedCustomer } },
            { status: 200 },
        );
    });
    return response;
}

export async function DELETE(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[CUSTOMER_DELETE]", async () => {
        const customer = await prisma.customer.delete({
            where: {
                customerId: params.customerId,
            },
        });

        if (!customer) {
            return NextResponse.json({ message: "Customer not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "success", data: { customer } }, { status: 202 });
    });
    return response;
}
