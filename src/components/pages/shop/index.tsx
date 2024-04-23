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
import { useState } from "react";
import { useDebounceVal } from "@/hooks/useDebounceVal";
import { Button } from "@/components/ui/button";

const limit = 15;
function ShopPage() {
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [debouncedInput] = useDebounceVal(searchInput, 400);
    const {
        data: productsRes,
        isLoading,
        isPending,
    } = useGetProducts(debouncedInput, selectedCategory);
    const { data: productCategoriesRes } = useGetProductCategories();
    const { addProduct } = useSaleInvoiceContext((state) => state);

    // products pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalProductsCount = productsRes?.result;
    const startSlicePoint = (currentPage - 1) * limit;
    const endSlicePoint = limit * currentPage;
    const paginatedProducts = productsRes?.data.products.slice(startSlicePoint, endSlicePoint);

    return (
        <section>
            <div className="flex items-start gap-4">
                <div className="flex grow flex-col gap-4 pt-1">
                    <div className="flex items-center justify-between">
                        <Input
                            placeholder="Search by product name"
                            className="w-[280px]"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Select
                            onValueChange={(value) => setSelectedCategory(value)}
                            value={selectedCategory}
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
                                        <p className="px-2 text-center text-sm">No Category</p>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid max-h-min grow grid-cols-2 gap-4 rounded-md md:grid-cols-3">
                        {isLoading || isPending || !paginatedProducts ? (
                            <ShopProductsSkeleton count={15} />
                        ) : (
                            paginatedProducts.map((product) => {
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
                    <div className="flex w-full items-center justify-between">
                        <Button
                            size="lg"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Prev
                        </Button>
                        <Button
                            size="lg"
                            disabled={endSlicePoint >= (totalProductsCount ?? 0)}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
                <CartSidebar />
            </div>
        </section>
    );
}

export default ShopPage;
