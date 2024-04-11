import { Button } from "@/components/ui/button";
import { useSaleInvoiceContext } from "@/providers/sale-invoice-store-provider";
import { Minus, Plus } from "lucide-react";

function CartSidebar() {
    const { products, increaseProductQuantity, decreseProductQuantity } = useSaleInvoiceContext(
        (state) => state,
    );
    return (
        <div className="h-[600px] min-w-[360px] rounded-md bg-slate-200 px-2 dark:bg-slate-900">
            <table className="table w-full">
                <thead className="w-full">
                    <tr className="w-full">
                        <th className="w-[120px] py-2">Product</th>
                        <th className="w-[120px] py-2">Quantity</th>
                        <th className="w-[120px] py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return (
                            <tr key={product.productCode} className="w-full">
                                <td className="flex-1 py-1 text-sm">{product.productName}</td>
                                <td className="flex-1 py-1 text-center text-sm">
                                    <div className="flex w-full items-center justify-center gap-2">
                                        <Button
                                            size="icon"
                                            className="h-5 w-5"
                                            onClick={() => {
                                                increaseProductQuantity(product.productCode);
                                            }}
                                        >
                                            <Plus size={14} />
                                        </Button>
                                        {product.quantity}
                                        <Button
                                            size="icon"
                                            className="h-5 w-5"
                                            onClick={() => {
                                                decreseProductQuantity(product.productCode);
                                            }}
                                        >
                                            <Minus size={14} />
                                        </Button>
                                    </div>
                                </td>
                                <td className="flex-1 py-1 text-center text-sm">
                                    {product.price * product.quantity}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CartSidebar;
