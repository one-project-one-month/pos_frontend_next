import { CreateProductFrom } from "./form";

const CreateProduct = () => {
    return (
        <section id="CreateProduct" className="">
            <h1 className="my-9 text-center text-xl">Create Product </h1>
            <div className="flex  justify-center">
                <div className="w-80">
                    <CreateProductFrom />
                </div>
            </div>
        </section>
    );
};

export default CreateProduct;
