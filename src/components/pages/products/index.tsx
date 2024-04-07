"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProductsDataTable from "./data-table";
import { Product } from "@prisma/client";
import { data } from "@/data/data";

function Products() {
    // replace with response data from '/api/v1/products'
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
    ];

    return (
        <div>
            <ProductsDataTable columns={columns} data={data.products} />
        </div>
    );
}

export default Products;
