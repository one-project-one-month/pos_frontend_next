import EditStaff from "@/components/pages/staffs/edit";
import { NextPage } from "next";

const EditProductPage: NextPage<{ params: { staffId: string } }> = ({ params }) => {
    return (
        <section>
            <EditStaff staffId={params.staffId} />
        </section>
    );
};

export default EditProductPage;
