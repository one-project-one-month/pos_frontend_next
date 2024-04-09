import { CreateProductForm } from "./form";

const CreateProduct = () => {
    return (
        <section id="CreateProduct">
            <h1 className="mb-6 text-2xl font-medium">Add Product</h1>
            <div className="w-full ">
                <div className="w-[80%] sm:w-[70%] md:w-[77%] lg:w-[50%]  ">
                    <CreateProductForm />
                </div>
            </div>
        </section>
    );
};

export default CreateProduct;
