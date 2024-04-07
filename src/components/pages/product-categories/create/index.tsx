import { CreateProductCategoriesFrom } from "@/components/pages/product-categories/create/form";

const CreateProductCategory = () => {
    return (
        <section id="CreateProductCategory" className="">
            <h1 className="my-9 text-center text-xl">Create Product Category</h1>
            <div className="flex  justify-center">
                <div className="w-80">
                    <CreateProductCategoriesFrom />
                </div>
            </div>
        </section>
    );
};

export default CreateProductCategory;
