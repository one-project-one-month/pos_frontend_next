"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Staff } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { useRef } from "react";
import StaffsDataTable from "./data-table";
import { useDeleteStaff, useGetStaffs } from "@/services/api/staffs";

function Staffs() {
    const { data: staffs, isLoading, isFetchedAfterMount, refetch: refetchStaffs } = useGetStaffs();
    const { mutate: deleteStaff } = useDeleteStaff();
    const popoverRef = useRef<HTMLButtonElement>(null);
    const columns: ColumnDef<Staff>[] = [
        {
            accessorKey: "staffCode",
            header: "Code",
        },
        {
            accessorKey: "staffName",
            header: "Name",
        },
        {
            accessorKey: "gender",
            header: "Gender",
            cell: ({ row }) => {
                return <div className="capitalize">{row.original.gender}</div>;
            },
        },
        {
            accessorKey: "position",
            header: "Position",
            cell: ({ row }) => {
                return <div className="capitalize">{row.original.position}</div>;
            },
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/staffs/edit/${row.original.staffId}`}>
                            <Button size="sm" variant="outline">
                                Edit
                            </Button>
                        </Link>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    Delete
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent side="top" className="flex flex-col gap-4">
                                <h4>Are you sure to delete this item?</h4>
                                <div className="ml-auto flex items-center gap-2">
                                    <PopoverClose asChild>
                                        <Button size="sm" variant="outline">
                                            Cancel
                                        </Button>
                                    </PopoverClose>
                                    <PopoverClose asChild ref={popoverRef} />
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            const id = row.original.staffId;
                                            deleteStaff(id, {
                                                onSuccess: () => {
                                                    refetchStaffs();
                                                    popoverRef.current?.click();
                                                },
                                            });
                                        }}>
                                        Sure
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-medium">Staffs List</h2>
                <Link href="/admin/staffs/create">
                    <Button variant="outline">Add New Staff</Button>
                </Link>
            </div>
            <StaffsDataTable
                columns={columns}
                data={staffs?.data.staffs}
                isLoading={isLoading || !isFetchedAfterMount}
            />
        </div>
    );
}

export default Staffs;
