import axiosInstance from "@/lib/axios";
import { Product } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
    return useQuery({
        queryKey: ["products", "get"],
        queryFn: (): Promise<Product[]> => {
            return axiosInstance.get("/products").then((res) => res.data);
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
