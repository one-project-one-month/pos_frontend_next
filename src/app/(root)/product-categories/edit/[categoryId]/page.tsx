import EditProductCategory from "@/components/pages/product-categories/edit";
import { NextPage } from "next";

const EditProductCategoryPage: NextPage<{ params: { categoryId: string } }> = ({ params }) => {
    return (
        <div>
            <EditProductCategory cid={params.categoryId} />
        </div>
    );
};

export default EditProductCategoryPage;
