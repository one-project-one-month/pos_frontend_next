"use client";
import { useGetProductById } from "@/services/api/products";
import { ProductForm } from "../form";

interface Props {
    productId: string;
}
function EditProduct({ productId }: Props) {
    const { data: product, isLoading } = useGetProductById(productId);
    return (
        <section id="CreateProduct">
            <h1 className="mb-6 text-2xl font-medium">Edit Product</h1>
            <div className="flex">
                <div className="w-full">
                    {!product || isLoading ? (
                        <div>loading...</div>
                    ) : (
                        <ProductForm initialValues={product} isEditMode />
                    )}
                </div>
            </div>
        </section>
    );
}

export default EditProduct;
