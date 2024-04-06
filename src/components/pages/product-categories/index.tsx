"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProductCategoriesDataTable from "./data-table";
import { ProductCategory } from "@prisma/client";

function ProductCategories() {
    // replace with response data from '/api/v1/product-categories'
    const demoData: ProductCategory[] = [
        {
            productCategoryId: "1",
            productCategoryCode: "P0001",
            productCategoryName: "Fruits",
        },
        {
            productCategoryId: "2",
            productCategoryCode: "P0002",
            productCategoryName: "Snacks",
        },
        {
            productCategoryId: "3",
            productCategoryCode: "P0003",
            productCategoryName: "Vegetables",
        },
    ];

    const columns: ColumnDef<ProductCategory>[] = [
        {
            accessorKey: "productCategoryId",
            header: "Id",
        },
        {
            accessorKey: "productCategoryCode",
            header: "Code",
        },
        {
            accessorKey: "productCategoryName",
            header: "Name",
        },
    ];

    return (
        <div>
            <ProductCategoriesDataTable columns={columns} data={demoData} />
        </div>
    );
}

export default ProductCategories;
