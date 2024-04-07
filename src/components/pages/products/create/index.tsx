import { CreateProductForm } from "./form";

const CreateProduct = () => {
    return (
        <section id="CreateProduct">
            <h1 className="my-9 text-center text-xl">Create Product</h1>
            <div className="flex justify-center">
                <div className="w-80">
                    <CreateProductForm />
                </div>
            </div>
        </section>
    );
};

export default CreateProduct;
