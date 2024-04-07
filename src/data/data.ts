import { Product, ProductCategory } from "@prisma/client";

export const data = {
    productCategories: [
        { productCategoryId: "1", productCategoryCode: "pc1", productCategoryName: "cloth" },
        { productCategoryId: "2", productCategoryCode: "pc2", productCategoryName: "tech" },
        { productCategoryId: "3", productCategoryCode: "pc3", productCategoryName: "book" },
    ] as ProductCategory[],
    products: [
        {
            categoryCode: "pc1",
            price: 10000,
            productCode: "p1",
            productId: "1",
            productName: "t-shirt",
        },
        {
            categoryCode: "pc2",
            price: 100000,
            productCode: "p2",
            productId: "2",
            productName: "nokia god like 1",
        },
        {
            categoryCode: "pc2",
            price: 2000000,
            productCode: "p3",
            productId: "3",
            productName: "iphone triple pro max",
        },
        {
            categoryCode: "pc3",
            price: 3000,
            productCode: "p3",
            productId: "4",
            productName: "sar pee pi lar",
        },
    ] as Product[],
};
