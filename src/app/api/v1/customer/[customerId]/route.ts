import prisma from "@/db/prismaClient";
import { catchAsyncError } from "@/lib/errorhandler";
import { NextRequest, NextResponse } from "next/server";

type paramsType = { params: { customerId: string } };

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

export async function PATCH(req: NextRequest, { params }: paramsType) {
    const response = await catchAsyncError("[CUSTOMER_PATCH]", async () => {
        const body = await req.json();

        const updatedCustomer = await prisma.customer.update({
            where: {
                customerId: params.customerId,
            },
            data: {
                customerName: body.customerName,
                customerDOB: body.customerDOB,
                customerGender: body.customerGender,
                customerMobilNo: body.customerMobilNo,
                cusotmerStateCode: body.cusotmerStateCode,
                customerTownShipCode: body.customerTownShip,
            },
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

        return NextResponse.json({ message: "success", data: { customer } }, { status: 204 });
    });
    return response;
}
