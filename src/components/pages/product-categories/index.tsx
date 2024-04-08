"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProductCategoriesDataTable from "./data-table";
import { ProductCategory } from "@prisma/client";
import { useGetProductCategories } from "@/services/api/product-categories";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-medium">Product Categories List</h2>
                <Link href="/product-categories/create">
                    <Button variant="outline">Add New Category</Button>
                </Link>
            </div>
            <ProductCategoriesDataTable columns={columns} data={data} isLoading={isLoading} />
        </div>
    );
}

export default ProductCategories;
