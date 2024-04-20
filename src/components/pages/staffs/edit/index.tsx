"use client";
import { FormSkeleton } from "@/components/ui/skeletons";
import { StaffForm } from "../form";
import { useGetStaffById } from "@/services/api/staffs";

interface Props {
    staffId: string;
}
function EditStaff({ staffId }: Props) {
    const { data: staff, isLoading } = useGetStaffById(staffId);
    return (
        <section id="CreateProduct">
            <h1 className="mb-6 text-2xl font-medium">Edit Staff</h1>
            <div className="flex">
                <div className="w-full">
                    {!staff || isLoading ? (
                        <FormSkeleton />
                    ) : (
                        <StaffForm initialValues={staff.data.staff} isEditMode />
                    )}
                </div>
            </div>
        </section>
    );
}

export default EditStaff;
