"use client";
import { useSaleInvoiceContext } from "@/providers/sale-invoice-store-provider";
import { useGetProducts } from "@/services/api/products";
import CartSidebar from "./cart-sidebar";
import ProductCard from "./product-card";

function ShopPage() {
    const { data: productsData, isLoading } = useGetProducts();
    const { addProduct } = useSaleInvoiceContext((state) => state);
    return (
        <section className="flex items-start gap-4">
            <div className="grid max-h-min grow grid-cols-2 gap-2.5 rounded-md md:grid-cols-3">
                {productsData?.slice(0, 20).map((product) => {
                    return (
                        <ProductCard
                            key={product.productCode}
                            product={product}
                            onAddBtnClick={() => addProduct(product)}
                        />
                    );
                })}
            </div>
            <CartSidebar />
        </section>
    );
}

export default ShopPage;
