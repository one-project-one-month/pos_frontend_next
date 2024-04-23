import TableHeader from "@/components/table-header";
import TablePagination from "@/components/table-pagination";
import CommonTable from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableSkeleton } from "@/components/ui/skeletons";
import { useTable } from "@/hooks/useTable";

interface PCategoriesProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[] | undefined;
    isLoading?: boolean;
}

function StaffsDataTable<TData, TValue>({
    columns,
    data,
    isLoading,
}: PCategoriesProps<TData, TValue>) {
    const table = useTable({ data: data ?? [], columns });

    return (
        <div>
            {!isLoading ? (
                <>
                    <TableHeader table={table} name="Staff Name" filterKey="staffName" />
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

export default StaffsDataTable;
