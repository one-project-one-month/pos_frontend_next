"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProductsDataTable from "./data-table";
import { useDeleteProduct, useGetProducts } from "@/services/api/products";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { useRef } from "react";
import { ProductWithCategory } from "@/types/baseType";

function Products() {
    const { data: productsRes, isLoading, refetch: refetchProducts } = useGetProducts();
    const { mutate: deleteProduct } = useDeleteProduct();
    const popoverRef = useRef<HTMLButtonElement>(null);
    const columns: ColumnDef<ProductWithCategory>[] = [
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
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => {
                const categoryName = row.original.category.productCategoryName;
                return <div>{categoryName}</div>;
            },
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={`/products/edit/${row.original.productId}`}>
                            <Button size="sm" variant="outline">
                                Edit
                            </Button>
                        </Link>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    Delete
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="top" className="flex flex-col gap-4">
                                <h4>Are you sure to delete this item?</h4>
                                <div className="ml-auto flex items-center gap-2">
                                    <PopoverClose asChild>
                                        <Button size="sm" variant="outline">
                                            Cancel
                                        </Button>
                                    </PopoverClose>
                                    <PopoverClose asChild ref={popoverRef} />
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            const id = row.original.productId;
                                            deleteProduct(id, {
                                                onSuccess: () => {
                                                    refetchProducts();
                                                    popoverRef.current?.click();
                                                },
                                            });
                                        }}
                                    >
                                        Sure
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-medium">Products List</h2>
                <Link href="/products/create">
                    <Button variant="outline">Add New Product</Button>
                </Link>
            </div>
            <ProductsDataTable
                columns={columns}
                data={productsRes?.data.products}
                isLoading={isLoading}
            />
        </div>
    );
}

export default Products;
