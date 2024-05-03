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

function ProductsDataTable<TData, TValue>({
    columns,
    data,
    isLoading,
}: PCategoriesProps<TData, TValue>) {
    const table = useTable({ data: data ?? [], columns });
    return (
        <div>
            {!isLoading ? (
                <>
                    <TableHeader table={table} name="Product Name" filterKey="productName" />
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

export default ProductsDataTable;
