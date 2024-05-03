import { Prisma, Product, ProductCategory } from "@prisma/client";

export interface ApiResponse<T = any> {
    message?: string;
    result?: number;
    data: T;
}

export type SaleInvoicesReturnType = Prisma.SaleInvoiceGetPayload<{
    include: {
        saleInvoiceDetails: {
            select: {
                quantity: true;
                price: true;
                amount: true;
                product: {
                    select: {
                        productId: true;
                        productCode: true;
                        productName: true;
                    };
                };
            };
        };
        staff: { select: { staffId: true; staffCode: true; staffName: true } };
    };
}>;

export type ProductWithCategory = Product & { category: ProductCategory };
