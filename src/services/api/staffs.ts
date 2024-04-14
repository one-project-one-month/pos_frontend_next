import type { Staff } from "@prisma/client";
import type { ApiResponse } from "@/types/baseType";
import type { SignInStaffType, UpdateStaffType, CreateStaffType } from "@/types/staff";

import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignIn = () => {
    return useMutation({
        mutationKey: ["staff", "signin"],
        mutationFn: (payload: SignInStaffType) => {
            return axiosInstance.post("/staffs/sign-in", payload);
        },
    });
};

export const useGetStaffs = () => {
    return useQuery({
        queryKey: ["products", "get-many"],
        queryFn: async (): Promise<ApiResponse<{ staffs: Staff[] }>> => {
            return axiosInstance.get("/staffs").then((res) => res.data);
        },
    });
};

export const useGetStaffById = (id: string) => {
    return useQuery({
        queryKey: ["staff", "get", id],
        queryFn: async (): Promise<ApiResponse<{ staff: Staff }>> => {
            return axiosInstance.get(`/staffs/${id}`).then((res) => res.data);
        },
    });
};

export const useCreateStaff = () => {
    return useMutation({
        mutationKey: ["staffs", "create"],
        mutationFn: (payload: CreateStaffType) => {
            return axiosInstance.post("/staffs", payload);
        },
    });
};

export const useUpdateStaff = () => {
    return useMutation({
        mutationKey: ["staff", "update"],
        mutationFn: ({ id, payload }: { id: string; payload: UpdateStaffType }) => {
            return axiosInstance.patch(`/staffs/${id}`, payload);
        },
    });
};

export const useDeleteStaff = () => {
    return useMutation({
        mutationKey: ["staff", "delete"],
        mutationFn: (id: string) => {
            return axiosInstance.delete(`/staffs/${id}`);
        },
    });
};
