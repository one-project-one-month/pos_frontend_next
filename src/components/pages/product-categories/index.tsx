"use client";
import { ColumnDef } from "@tanstack/react-table";
import ProductCategoriesDataTable from "./data-table";
import { ProductCategory } from "@prisma/client";
import {
    useDeleteProductCategory,
    useGetProductCategories,
} from "@/services/api/product-categories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRef } from "react";

function ProductCategories() {
    const {
        data: productCategories,
        isLoading,
        isRefetching,
        refetch: refetchProductCategories,
    } = useGetProductCategories();
    const { mutate: deleteProductCategory } = useDeleteProductCategory();
    const popoverRef = useRef<HTMLButtonElement>(null);

    // Columns definition for the data table
    const columns: ColumnDef<ProductCategory>[] = [
        {
            header: "No",
            cell: ({ row }) => {
                return <div>{row.index + 1}</div>;
            },
        },
        {
            accessorKey: "productCategoryCode",
            header: "Code",
        },
        {
            accessorKey: "productCategoryName",
            header: "Name",
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={`/product-categories/edit/${row.original.productCategoryId}`}>
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
                                            const id = row.original.productCategoryId;
                                            deleteProductCategory(id, {
                                                onSuccess: () => {
                                                    refetchProductCategories();
                                                    popoverRef.current?.click();
                                                },
                                            });
                                        }}>
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
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-medium">Product Categories List</h2>
                <Link href="/product-categories/create">
                    <Button variant="outline">Add New Category</Button>
                </Link>
            </div>
            <ProductCategoriesDataTable
                columns={columns}
                data={productCategories}
                isLoading={isLoading || isRefetching}
            />
        </div>
    );
}

export default ProductCategories;
