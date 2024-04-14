"use client";
import { useSaleInvoiceContext } from "@/providers/sale-invoice-store-provider";
import { useGetProducts } from "@/services/api/products";
import CartSidebar from "./cart-sidebar";
import ProductCard from "./product-card";
import { ShopProductsSkeleton } from "@/components/ui/skeletons";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetProductCategories } from "@/services/api/product-categories";

function ShopPage() {
    const { data: productsRes, isLoading } = useGetProducts();
    const { data: productCategoriesRes } = useGetProductCategories();
    const { addProduct } = useSaleInvoiceContext((state) => state);

    return (
        <section>
            <div className="flex items-start gap-4">
                <div className="flex grow flex-col gap-4 pt-1">
                    <div className="flex items-center justify-between">
                        <Input placeholder="Search by product code" className="w-[280px]" />
                        <Select
                        // onValueChange={(value) => setValue("categoryCode", value)}
                        // value={value}
                        >
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Search by Product Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Product Category</SelectLabel>
                                    {productCategoriesRes &&
                                    productCategoriesRes.data.categories.length ? (
                                        productCategoriesRes.data.categories.map((pc) => (
                                            <SelectItem
                                                key={pc.productCategoryId}
                                                value={pc.productCategoryCode}
                                            >
                                                {pc.productCategoryName}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div>No Category</div>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid max-h-min grow grid-cols-2 gap-2.5 rounded-md md:grid-cols-3">
                        {isLoading || !productsRes ? (
                            <ShopProductsSkeleton count={18} />
                        ) : (
                            productsRes?.data.products.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.productCode}
                                        product={product}
                                        onAddBtnClick={() => addProduct(product)}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
                <CartSidebar />
            </div>
        </section>
    );
}

export default ShopPage;
