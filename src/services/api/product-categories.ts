import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types/baseType";
import { ProductCategory } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProductCategories = () => {
    return useQuery({
        queryKey: ["product-categories", "get"],
        queryFn: (): Promise<ApiResponse<{ categories: ProductCategory[] }>> =>
            axiosInstance.get("/product-categories").then((res) => res.data),
    });
};

export const useGetProductCategoryById = (cid: string) => {
    return useQuery({
        queryKey: ["product-category", "get", cid],
        queryFn: (): Promise<ApiResponse<{ category: ProductCategory }>> => {
            return axiosInstance.get(`/product-categories/${cid}`).then((res) => res.data);
        },
    });
};

export const useCreateProductCategory = () => {
    return useMutation({
        mutationKey: ["product-category", "create"],
        mutationFn: (payload: Omit<ProductCategory, "productCategoryId">) => {
            return axiosInstance.post("/product-categories", payload);
        },
    });
};

export const useEditProductCategory = () => {
    return useMutation({
        mutationKey: ["product-category", "edit"],
        mutationFn: ({
            payload,
            cid,
        }: {
            payload: Omit<ProductCategory, "productCategoryId">;
            cid: string;
        }) => {
            return axiosInstance.patch(`/product-categories/${cid}`, payload);
        },
    });
};

export const useDeleteProductCategory = () => {
    return useMutation({
        mutationKey: ["product-category", "delete"],
        mutationFn: (id: string) => {
            return axiosInstance.delete(`/product-categories/${id}`);
        },
    });
};
