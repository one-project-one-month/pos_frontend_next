import { Table } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps<TData> {
    table: Table<TData>;
}
function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between">
            {/* <div>
                <Select onValueChange={(value) => table.setPageSize(Number(value))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Show ${8} Items`} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="4">Show 4 Items</SelectItem>
                            <SelectItem value="8">Show 8 Items</SelectItem>
                            <SelectItem value="12">Show 12 Items</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div> */}
            <div className="flex items-center gap-6 py-2">
                <span className="text-sm text-slate-800 dark:text-slate-400">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <div className="flex items-center gap-4">
                    {/* prev page button */}
                    <Button
                        size="icon"
                        variant="outline"
                        disabled={!table.getCanPreviousPage()}
                        onClick={table.previousPage}
                    >
                        <ChevronLeft />
                    </Button>
                    {/* next page button */}
                    <Button
                        size="icon"
                        variant="outline"
                        disabled={!table.getCanNextPage()}
                        onClick={table.nextPage}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TablePagination;
