import { Button } from "@/components/ui/button";
import { useSaleInvoiceContext } from "@/providers/sale-invoice-store-provider";
import { Minus, Plus, Trash } from "lucide-react";

function CartSidebar() {
    const { products, increaseProductQuantity, decreseProductQuantity, removeProduct } =
        useSaleInvoiceContext((state) => state);

    // total amount of products' price
    const totalPrice = products.reduce((total, curr) => {
        return total + curr.price * curr.quantity;
    }, 0);

    return (
        <div className="sticky top-[72px] flex h-[calc(100dvh-78px)] w-[394px] flex-col overflow-hidden rounded-md bg-slate-200 dark:bg-slate-900">
            <div className="grow overflow-y-scroll">
                <table className="table w-full">
                    <thead className="sticky top-0 w-full border-b-2 border-b-slate-300 bg-slate-200 dark:border-b-slate-800 dark:bg-slate-900">
                        <tr className="w-full">
                            <th className="mb-2 w-[130px] p-4 text-start font-medium">Product</th>
                            <th className="mb-2 w-[130px] p-4 font-medium">Quantity</th>
                            <th className="mb-2 w-[130px] p-4 text-end font-medium">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.productCode} className="w-full">
                                    <td className="flex-1 px-4 py-2.5 text-sm">
                                        {product.productName}
                                    </td>
                                    <td className="flex-1 px-4 py-2.5 text-center text-sm">
                                        <div className="flex w-full items-center gap-2">
                                            <div className="mx-auto flex max-w-min items-center justify-center overflow-hidden rounded-sm border-b border-t border-slate-800">
                                                <Button
                                                    size="icon"
                                                    className="h-5 w-6 rounded-none"
                                                    onClick={() => {
                                                        increaseProductQuantity(
                                                            product.productCode,
                                                        );
                                                    }}>
                                                    <Plus size={14} />
                                                </Button>
                                                <p className="min-w-[20px] text-center">
                                                    {product.quantity}
                                                </p>
                                                <Button
                                                    size="icon"
                                                    className="h-5 w-6 rounded-none"
                                                    onClick={() => {
                                                        decreseProductQuantity(product.productCode);
                                                    }}>
                                                    <Minus size={14} />
                                                </Button>
                                            </div>
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                className="h-5 w-6 rounded-sm"
                                                onClick={() => {
                                                    removeProduct(product);
                                                }}>
                                                <Trash size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="flex-1 px-4 py-2.5 text-end text-sm">
                                        {product.price * product.quantity}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 flex w-full flex-col gap-2 border-t border-t-slate-300 px-4 py-4 dark:border-t-slate-800">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Tax :</p>
                    <p className="text-sm font-medium">{"5%"}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="font-medium">Total :</p>
                    <p className="font-medium">{totalPrice}</p>
                </div>
                <Button className="w-full">Checkout</Button>
            </div>
        </div>
    );
}

export default CartSidebar;
