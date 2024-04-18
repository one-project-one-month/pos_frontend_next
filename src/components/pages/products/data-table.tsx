import TableHeader from "@/components/table-header";
import TablePagination from "@/components/table-pagination";
import CommonTable from "@/components/table";
import { type ColumnDef } from "@tanstack/react-table";
import { useTable } from "@/hooks/useTable";

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
            {!isLoading || data ? (
                <>
                    <div>
                        <TableHeader table={table} name="Product Name" filterKey="productName" />
                    </div>
                    <CommonTable table={table} />
                    <div className="flex items-center justify-end">
                        <TablePagination table={table} />
                    </div>
                </>
            ) : (
                // Loading Skelton Ui
                <div>Loading...</div>
            )}
        </div>
    );
}

export default ProductsDataTable;
