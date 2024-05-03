import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";

import { createCustomerSchema } from "@/validations/customer";

/* GET /api/v1/customer */
export async function GET() {
    const response = await catchAsyncError("[CUSTOMER_GETMANY]", async () => {
        const customers = await prisma.customer.findMany();

        return NextResponse.json(
            { message: "success", result: customers.length, data: { customers } },
            { status: 200 },
        );
    });
    return response;
}

/* POST /api/v1/customer */
export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[CUSTOMER_POST]", async () => {
        const body = await req.json();

        const validation = createCustomerSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json(
                { message: "Invalid inputs.", errors: validation.error.format() },
                { status: 400 },
            );

        const newCustomer = await prisma.customer.create({
            data: validation.data,
        });

        return NextResponse.json(
            { message: "success", data: { customer: newCustomer } },
            { status: 201 },
        );
    });
    return response;
}
