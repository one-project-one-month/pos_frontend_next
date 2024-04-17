import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
    const response = await catchAsyncError("[CUSTOMER_POST]", async () => {
        const body = await req.json();
        const newCustomer = await prisma.customer.create({
            data: {
                customerCode: body.customerCode,
                customerName: body.customerName,
                customerDOB: body.customerDOB,
                customerGender: body.customerGender,
                customerMobilNo: body.customerMobilNo,
                cusotmerStateCode: body.cusotmerStateCode,
                customerTownShipCode: body.customerTownShipCode,
            },
        });
        return NextResponse.json(
            { message: "success", data: { customer: newCustomer } },
            { status: 201 },
        );
    });
    return response;
}
