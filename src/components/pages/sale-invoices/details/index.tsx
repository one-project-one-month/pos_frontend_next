"use client";

import { useGetSaleInvoiceById } from "@/services/api/sale-invoices";

interface SaleInvoiceDetailsProps {
    id: string;
}
function SaleInvoiceDetails({ id }: SaleInvoiceDetailsProps) {
    const { data: saleInvoiceDetailRes, isLoading } = useGetSaleInvoiceById(id);
    console.log(saleInvoiceDetailRes?.data);
    return (
        <div>
            <h4>Sale Invoice Details</h4>
            <div className="flex flex-col gap-6 leading-9">
                {JSON.stringify(saleInvoiceDetailRes?.data.saleInvoice)}
            </div>
        </div>
    );
}

export default SaleInvoiceDetails;
