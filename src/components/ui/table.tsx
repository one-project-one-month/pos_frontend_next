import { Table, flexRender } from "@tanstack/react-table";

interface Props<TData> {
    table: Table<TData>;
}
function CommonTable<TData>({ table }: Props<TData>) {
    return (
        <div className="customize__scroll m-auto flex w-full flex-col">
            <table className="table w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="border-b-base-300/50 rounded-sm border-b"
                        >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        className="text-base-500 group min-w-[130px] cursor-pointer p-3 text-left text-sm font-medium capitalize md:text-base"
                                    >
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows?.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b-base-300/30 hover:bg-base-100 h-[69px] border-b transition-all last-of-type:border-none"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="text-base-600 px-3 py-4 text-left text-sm"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="text-base-600 px-3 py-5 text-center font-medium"
                            >
                                No Data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CommonTable;
