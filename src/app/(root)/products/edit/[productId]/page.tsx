import EditProduct from "@/components/pages/products/edit";
import { NextPage } from "next";

const EditProductPage: NextPage<{ params: { productId: string } }> = ({ params }) => {
    return (
        <section>
            <EditProduct productId={params.productId} />
        </section>
    );
};

export default EditProductPage;
