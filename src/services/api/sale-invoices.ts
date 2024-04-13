import axiosInstance from "@/lib/axios";
import { ApiResponse, SaleInvoicesReturnType } from "@/types/baseType";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export const useGetSaleInvoices = (startDate: Date | string, endDate: Date | string) => {
    return useQuery({
        queryKey: ["sale-invoices", "get-many", startDate, endDate],
        queryFn: (): Promise<ApiResponse<{ saleInvoices: SaleInvoicesReturnType[] }>> => {
            return axiosInstance
                .get(`/sale-invoices?start=${startDate}&end=${endDate}`)
                .then((res) => res.data);
        },
        placeholderData: keepPreviousData,
    });
};

export const useGetSaleInvoiceById = (sid: string) => {
    return useQuery({
        queryKey: ["sale-invoice", "get", sid],
        queryFn: (): Promise<ApiResponse<{ saleInvoice: SaleInvoicesReturnType }>> => {
            return axiosInstance.get(`/sale-invoices/${sid}`).then((res) => res.data);
        },
    });
};
