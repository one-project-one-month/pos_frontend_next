"use client";
import { useGetSaleInvoices } from "@/services/api/sale-invoices";
import { SaleInvoicesReturnType } from "@/types/baseType";
import { ColumnDef } from "@tanstack/react-table";
import SaleInvoicesDataTable from "./data-table";
import { useState } from "react";
import { subMonths, addDays, formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SaleInvoices() {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: subMonths(new Date(), 2),
        to: addDays(new Date(), 4),
    });
    const {
        data: saleInvoicesRes,
        isLoading,
        isPending,
    } = useGetSaleInvoices(dateRange.from, dateRange.to);

    const columns: ColumnDef<SaleInvoicesReturnType>[] = [
        {
            accessorKey: "voucherNo",
            header: "Voucher No",
        },
        {
            accessorKey: "dateTime",
            header: "Date",
            cell: ({ row }) => {
                return <div>{formatDate(row.original.dateTime, "dd MMMM, y")}</div>;
            },
        },
        {
            accessorKey: "staffCode",
            header: "Staff Code",
        },
        {
            accessorKey: "totalAmount",
            header: "Total Amount",
        },
        {
            header: " ",
            cell: ({ row }) => {
                return (
                    <div>
                        <Link href={`/sale-invoices/${row.original.saleInvoiceId}`}>
                            <Button variant="secondary" size="sm">
                                Check Details
                            </Button>
                        </Link>
                    </div>
                );
            },
        },
    ];
    return (
        <section>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-medium">Sale Invoices List</h2>
            </div>
            <SaleInvoicesDataTable
                dateRange={dateRange}
                setDateRange={setDateRange}
                columns={columns}
                data={saleInvoicesRes?.data.saleInvoices}
                isLoading={isLoading || isPending}
            />
        </section>
    );
}

export default SaleInvoices;
