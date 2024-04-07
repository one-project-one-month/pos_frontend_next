import { CreateProductCategoryFrom } from "@/components/pages/product-categories/form";

const CreateProductCategory = () => {
    return (
        <section id="CreateProductCategory" className="">
            <h1 className="my-9 text-center text-xl">Create Product Category</h1>
            <div className="flex  justify-center">
                <div className="w-80">
                    <CreateProductCategoryFrom />
                </div>
            </div>
        </section>
    );
};

export default CreateProductCategory;
