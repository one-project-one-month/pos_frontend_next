import EditProduct from "@/components/pages/products/edit";
import { NextPage } from "next";

const EditProductPage: NextPage<{ params: { productId: string } }> = ({ params }) => {
    return <EditProduct productId={params.productId} />;
};

export default EditProductPage;
