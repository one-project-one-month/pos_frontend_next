import axiosInstance from "@/lib/axios";
import type { ApiResponse } from "@/types/baseType";
import type { Product } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = (name?: string, categoryCode?: string) => {
    return useQuery({
        queryKey: ["products", "get-many", name, categoryCode],
        queryFn: (): Promise<ApiResponse<{ products: Product[] }>> => {
            return axiosInstance
                .get(`/products?name=${name}&categoryCode=${categoryCode}`)
                .then((res) => res.data);
        },
    });
};

export const useGetProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", "get", id],
        queryFn: (): Promise<ApiResponse<{ product: Product }>> => {
            return axiosInstance.get(`/products/${id}`).then((res) => res.data);
        },
    });
};

export const useCreateProduct = () => {
    return useMutation({
        mutationKey: ["products", "create"],
        mutationFn: (payload: Omit<Product, "productId">) => {
            return axiosInstance.post("/products", payload);
        },
    });
};

export const useUpdateProduct = () => {
    return useMutation({
        mutationKey: ["product", "update"],
        mutationFn: ({ payload, id }: { payload: Omit<Product, "productId">; id: string }) => {
            return axiosInstance.patch(`/products/${id}`, payload);
        },
    });
};

export const useDeleteProduct = () => {
    return useMutation({
        mutationKey: ["product", "delete"],
        mutationFn: (id: string) => {
            return axiosInstance.delete(`/products/${id}`);
        },
    });
};
