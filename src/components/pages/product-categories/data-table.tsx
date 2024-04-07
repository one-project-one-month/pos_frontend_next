import TableHeader from "@/components/shared/table-header";
import TablePagination from "@/components/shared/table-pagination";
import CommonTable from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface PCategoriesProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[] | undefined;
    isLoading?: boolean;
}

function ProductCategoriesDataTable<TData, TValue>({
    columns,
    data,
    isLoading,
}: PCategoriesProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        columns,
        data: data ?? [],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });
    return (
        <div>
            {!isLoading || data ? (
                <>
                    <div>
                        <TableHeader
                            table={table}
                            name="Category Name"
                            filterKey="productCategoryName"
                        />
                    </div>

                    <CommonTable table={table} />
                    <div className="flex items-center justify-end">
                        <TablePagination table={table} />
                    </div>
                </>
            ) : (
                // Loading Skeleton Ui
                <div>loading...</div>
            )}
        </div>
    );
}

export default ProductCategoriesDataTable;
