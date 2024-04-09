import { EditProductForm } from "./form";

const EditProduct = () => {
    return (
        <section id="EditProduct">
            <h1 className="mb-6 text-2xl font-medium">Edit Product</h1>
            <div className="w-full ">
                <div className="w-[80%] sm:w-[70%] md:w-[77%] lg:w-[50%]  ">
                    <EditProductForm />
                </div>
            </div>
        </section>
    );
};

export default EditProduct;
