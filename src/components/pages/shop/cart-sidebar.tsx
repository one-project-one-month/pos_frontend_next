import { Button } from "@/components/ui/button";
import { useSaleInvoiceContext } from "@/providers/sale-invoice-store-provider";
import { Minus, Plus } from "lucide-react";

function CartSidebar() {
    const { products, increaseProductQuantity, decreseProductQuantity } = useSaleInvoiceContext(
        (state) => state,
    );

    // total amount of products' price
    const totalPrice = products.reduce((total, curr) => {
        return total + curr.price * curr.quantity;
    }, 0);

    return (
        <div className="sticky top-[72px] flex h-[calc(100dvh-78px)] min-w-[360px] flex-col rounded-md bg-slate-200 dark:bg-slate-900">
            <div className="grow overflow-y-scroll px-4">
                <table className="table w-full">
                    <thead className="sticky top-0 w-full bg-slate-200 dark:bg-slate-900">
                        <tr className="w-full">
                            <th className="w-[120px] py-2 text-start font-medium">Product</th>
                            <th className="w-[120px] py-2 font-medium">Quantity</th>
                            <th className="w-[120px] py-2 text-end font-medium">Price</th>
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
                                            <p className="min-w-[16px]">{product.quantity}</p>
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
                                    <td className="flex-1 py-1 text-end text-sm">
                                        {product.price * product.quantity}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 flex w-full flex-col gap-4 border-t border-t-input px-4 py-4">
                <div className="flex items-center justify-between">
                    <p>Total Price :</p>
                    <p>{totalPrice}</p>
                </div>
                <Button className="w-full">Checkout</Button>
            </div>
        </div>
    );
}

export default CartSidebar;
