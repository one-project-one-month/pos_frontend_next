"use client";
import { useGetProductById } from "@/services/api/products";
import { ProductForm } from "../form";
import { FormSkeleton } from "@/components/ui/skeletons";

interface EditProductProps {
    productId: string;
}

function EditProduct({ productId }: EditProductProps) {
    const { data: productRes, isLoading } = useGetProductById(productId);
    return (
        <section id="CreateProduct">
            <h1 className="mb-6 text-2xl font-medium">Edit Product</h1>
            <div className="flex">
                <div className="w-full">
                    {!productRes || isLoading ? (
                        <FormSkeleton />
                    ) : (
                        <ProductForm initialValues={productRes?.data.product} isEditMode />
                    )}
                </div>
            </div>
        </section>
    );
}

export default EditProduct;
