import { DatePickerWithRange } from "@/components/date-range-picker";
import TablePagination from "@/components/shared/table-pagination";
import { Input } from "@/components/ui/input";
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
    dateRange: { from: Date; to: Date };
    setDateRange: (drange: any) => void;
}

function SaleInvoicesDataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    dateRange,
    setDateRange,
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
                    <div className="my-2 flex items-center justify-between">
                        <Input
                            value={(table.getColumn("voucherNo")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("voucherNo")?.setFilterValue(event.target.value)
                            }
                            placeholder={`Search Voucher Number`}
                            className="max-w-[280px]"
                        />
                        {/* props were drilled here, forgive me :D */}
                        <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
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

export default SaleInvoicesDataTable;
