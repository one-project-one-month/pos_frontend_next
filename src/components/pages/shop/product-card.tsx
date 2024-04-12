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
        <div className="col-span-1 rounded-md border border-input bg-slate-200 p-2 shadow-sm dark:bg-slate-900">
            <div className="flex items-center justify-between">
                <span className="text-sm">#{product.productCode}</span>
                <div className="flex items-center gap-3">
                    <span className="rounded-md bg-sky-500 px-2 py-0.5 text-sm text-slate-50">
                        ${product.price}
                    </span>
                    <Button size="icon" className="h-6 w-6" onClick={onAddBtnClick}>
                        <PackagePlus size={18} />
                    </Button>
                </div>
            </div>
            <h4 className="mt-4 text-base font-medium">{product.productName}</h4>
        </div>
    );
}

export default ProductCard;
