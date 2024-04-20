import { DatePickerWithRange } from "@/components/date-range-picker";
import TablePagination from "@/components/table-pagination";
import { Input } from "@/components/ui/input";
import CommonTable from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";
import { useTable } from "@/hooks/useTable";

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
    const table = useTable({ data: data ?? [], columns });
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
