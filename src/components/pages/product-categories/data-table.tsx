import TableHeader from "@/components/table-header";
import TablePagination from "@/components/table-pagination";
import CommonTable from "@/components/table";
import { type ColumnDef } from "@tanstack/react-table";
import { useTable } from "@/hooks/useTable";
import { TableSkeleton } from "@/components/ui/skeletons";

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
    const table = useTable({ data: data ?? [], columns });
    return (
        <div>
            {!isLoading || data ? (
                <>
                    <TableHeader
                        table={table}
                        name="Category Name"
                        filterKey="productCategoryName"
                    />

                    <CommonTable table={table} />
                    <div className="flex items-center justify-end">
                        <TablePagination table={table} />
                    </div>
                </>
            ) : (
                <TableSkeleton />
            )}
        </div>
    );
}

export default ProductCategoriesDataTable;
