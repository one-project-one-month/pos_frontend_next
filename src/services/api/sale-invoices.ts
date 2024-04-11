import axiosInstance from "@/lib/axios";
import { SaleInvoice, SaleInvoiceDetails, Staff } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetSaleInvoices = () => {
    return useQuery({
        queryKey: ["sale-invoices", "get-many"],
        queryFn: (): Promise<
            (SaleInvoice & { saleInvoiceDetails: SaleInvoiceDetails[]; staff: Staff })[]
        > => {
            return axiosInstance.get("/sale-invoices").then((res) => res.data.data.saleInvoices);
        },
    });
};

export const useGetSaleInvoiceById = (sid: string) => {
    return useQuery({
        queryKey: ["sale-invoice", "get", sid],
        queryFn: (): Promise<
            SaleInvoice & { saleInvoiceDetails: SaleInvoiceDetails[]; staff: Staff }
        > => {
            return axiosInstance
                .get(`/sale-invoices/${sid}`)
                .then((res) => res.data.data.saleInvoice);
        },
    });
};
