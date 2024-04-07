import axiosInstance from "@/lib/axios";
import { ProductCategory } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProductCategories = () => {
    return useQuery({
        queryKey: ["product-categories", "get"],
        queryFn: (): Promise<ProductCategory[]> =>
            axiosInstance.get("/product-categories").then((res) => res.data),
    });
};

export const useCreateProductCategory = () => {
    return useMutation({
        mutationKey: ["product-category", "create"],
        mutationFn: (payload: ProductCategory) => {
            return axiosInstance.post("/product-categories", payload);
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
