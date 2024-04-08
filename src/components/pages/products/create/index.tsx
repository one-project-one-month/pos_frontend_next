import { CreateProductForm } from "../form";

const CreateProduct = () => {
    return (
        <section id="CreateProduct">
            <h1 className="mb-6 text-2xl font-medium">Add Product</h1>
            <div className="flex">
                <div className="w-full">
                    <CreateProductForm />
                </div>
            </div>
        </section>
    );
};

export default CreateProduct;
