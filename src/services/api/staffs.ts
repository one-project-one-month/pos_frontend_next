import axiosInstance from "@/lib/axios";
import { Product, Staff } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetStaffs = () => {
    return useQuery({
        queryKey: ["staffs", "get-many"],
        queryFn: (): Promise<Staff[]> => {
            return axiosInstance.get("/staffs").then((res) => res.data.data.staffs);
        },
    });
};

export const useGetStaffById = (id: string) => {
    return useQuery({
        queryKey: ["product", "get", id],
        queryFn: (): Promise<Staff> => {
            return axiosInstance.get(`/staffs/${id}`).then((res) => res.data.data.staff);
        },
    });
};

export const useCreateStaff = () => {
    return useMutation({
        mutationKey: ["staffs", "create"],
        mutationFn: (payload: Omit<Staff, "staffId">) => {
            return axiosInstance.post("/staffs", payload);
        },
    });
};

export const useUpdateStaff = () => {
    return useMutation({
        mutationKey: ["staff", "update"],
        mutationFn: ({ payload, id }: { payload: Omit<Staff, "staffId">; id: string }) => {
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
