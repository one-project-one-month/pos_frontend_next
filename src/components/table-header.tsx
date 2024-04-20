import { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";

interface TableHeaderProps<TData> {
    table: Table<TData>;
    filterKey: string;
    name: string;
}
function TableHeader<TData>({ table, filterKey, name }: TableHeaderProps<TData>) {
    return (
        <div className="my-2 flex items-center justify-between">
            <Input
                value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn(filterKey)?.setFilterValue(event.target.value)}
                placeholder={`Search ${name}`}
                className="max-w-[280px]"
            />
        </div>
    );
}

export default TableHeader;
