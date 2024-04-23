import prisma from "@/db/prismaClient";

export async function handler({ searchParams }: { searchParams: URLSearchParams }) {
    let response;
    const name = searchParams?.get("name");
    const priceStart = searchParams?.get("priceStart");
    const priceEnd = searchParams?.get("priceEnd");
    const categoryCode = searchParams?.get("categoryCode");
    const where: any = {};

    if (name && name !== "undefined") {
        where.productName = {
            contains: name,
        };
    }

    if (priceStart && priceEnd) {
        where.price = {
            gte: parseFloat(priceStart),
            lte: parseFloat(priceEnd),
        };
    }

    if (categoryCode && categoryCode !== "undefined") {
        where.categoryCode = categoryCode;
    }

    response = await prisma.product.findMany({
        where,
        include: {
            category: true,
        },
    });

    return response;
}
