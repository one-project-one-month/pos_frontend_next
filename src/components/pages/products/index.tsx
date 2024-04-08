"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProductsDataTable from "./data-table";
import { Product } from "@prisma/client";
import { useGetProducts } from "@/services/api/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Products() {
    const { data: products, isLoading } = useGetProducts();
    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "productId",
            header: "Id",
        },
        {
            accessorKey: "productCode",
            header: "Code",
        },
        {
            accessorKey: "productName",
            header: "Name",
        },
        {
            accessorKey: "price",
            header: "Price",
        },
    ];

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-medium">Products List</h2>
                <Link href="/products/create">
                    <Button variant="outline">Add New Product</Button>
                </Link>
            </div>
            <ProductsDataTable columns={columns} data={products} isLoading={isLoading} />
        </div>
    );
}

export default Products;
