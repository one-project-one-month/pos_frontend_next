import { Table as TableType, flexRender } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props<TData> {
    table: TableType<TData>;
}
function CommonTable<TData>({ table }: Props<TData>) {
    return (
        <div className="m-auto flex w-full flex-col">
            <Table className="w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="border-b-base-300/50 rounded-sm border-b"
                        >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="p-3 text-left text-sm font-medium capitalize md:text-base"
                                    >
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                // className="h-[68px] border-b border-b-slate-300/50 transition-all last-of-type:border-none hover:bg-slate-200/50 dark:border-b-slate-900/50 dark:hover:bg-slate-900/50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        colSpan={1}
                                        key={cell.id}
                                        className="px-3 py-4 text-left text-sm"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="px-3 py-5 text-center font-medium">
                                No Data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default CommonTable;
