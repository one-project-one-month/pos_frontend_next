"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProductCategoriesDataTable from "./data-table";
import { ProductCategory } from "@prisma/client";
import { useGetProductCategories } from "@/services/api/product-categories";

function ProductCategories() {
    const { data, isLoading } = useGetProductCategories();

    // Columns definition for the data table
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
            <ProductCategoriesDataTable columns={columns} data={data} isLoading={isLoading} />
        </div>
    );
}

export default ProductCategories;
