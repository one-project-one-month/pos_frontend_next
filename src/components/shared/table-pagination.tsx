import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps<TData> {
    table: Table<TData>;
}
function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
    return (
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
    );
}

export default TablePagination;
