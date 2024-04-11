import axiosInstance from "@/lib/axios";
import { SaleInvoice, SaleInvoiceDetails, Staff } from "@prisma/client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export const useGetSaleInvoices = (startDate: Date | string, endDate: Date | string) => {
    return useQuery({
        queryKey: ["sale-invoices", "get-many", startDate, endDate],
        queryFn: (): Promise<
            (SaleInvoice & { saleInvoiceDetails: SaleInvoiceDetails[]; staff: Staff })[]
        > => {
            return axiosInstance
                .get(`/sale-invoices?start=${startDate}&end=${endDate}`)
                .then((res) => res.data.data.saleInvoices);
        },
        placeholderData: keepPreviousData,
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
