"use client";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/services/api/products";
import { Plus } from "lucide-react";

function ShopPage() {
    const { data: productsData, isLoading } = useGetProducts();
    return (
        <section className="flex items-start gap-4">
            <div className="grid max-h-min grow grid-cols-2 gap-2 rounded-md md:grid-cols-3 xl:grid-cols-4">
                {productsData?.slice(0, 10).map((product) => {
                    return (
                        <div
                            key={product.productCode}
                            className="col-span-1 rounded-md border border-input bg-slate-200 p-2 shadow-sm dark:bg-slate-900">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">#{product.productCode}</span>
                                <div className="flex items-center gap-3">
                                    <span className="rounded-md bg-sky-500 px-2 py-0.5 text-sm">
                                        ${product.price}
                                    </span>
                                    <Button size="icon" className="h-6 w-6">
                                        <Plus size={18} />
                                    </Button>
                                </div>
                            </div>
                            <h4 className="mt-4 text-base font-medium">{product.productName}</h4>
                        </div>
                    );
                })}
            </div>
            <div className="h-[600px] min-w-[320px] rounded-md bg-slate-200 dark:bg-slate-900"></div>
        </section>
    );
}

export default ShopPage;
