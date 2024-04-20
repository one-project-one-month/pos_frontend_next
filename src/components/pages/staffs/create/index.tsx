import { StaffForm } from "../form";

const StaffCreate = () => {
    return (
        <section>
            <h1 className="mb-6 text-2xl font-medium">Add New Staff</h1>
            <div className="flex">
                <div className="w-full">
                    <StaffForm />
                </div>
            </div>
        </section>
    );
};

export default StaffCreate;
