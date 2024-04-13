"use client";
import { StaffForm } from "../form";
import { useGetStaffById } from "@/services/api/staffs";

interface Props {
    staffId: string;
}
function EditStaff({ staffId }: Props) {
    const { data: staff, isLoading } = useGetStaffById(staffId);
    return (
        <section id="CreateProduct">
            <h1 className="mb-6 text-2xl font-medium">Edit Product</h1>
            <div className="flex">
                <div className="w-full">
                    {!staff || isLoading ? (
                        <div>loading...</div>
                    ) : (
                        <StaffForm initialValues={staff} isEditMode />
                    )}
                </div>
            </div>
        </section>
    );
}

export default EditStaff;
