import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import React from "react";

interface ProductCardProps {
    product: {
        productCode: string;
        price: number;
        productName: string;
    };
    onAddBtnClick: () => void;
}
function ProductCard({ product, onAddBtnClick }: ProductCardProps) {
    return (
        <div className="col-span-1 rounded-md border border-input bg-slate-100 p-2 shadow-sm dark:bg-slate-900">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <span className="text-sm uppercase">#{product.productCode}</span>
                    <span className="rounded-md bg-sky-500 px-2 py-0.5 text-sm text-slate-50">
                        ${product.price}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Button size="sm" className="gap-1 px-2 text-sm" onClick={onAddBtnClick}>
                        <PackagePlus size={18} /> <span className="text-sm">Add</span>
                    </Button>
                </div>
            </div>
            <h4 className="mt-4 text-base font-medium">{product.productName}</h4>
        </div>
    );
}

export default ProductCard;
