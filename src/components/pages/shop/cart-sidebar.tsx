import { Button } from "@/components/ui/button";
import { useSaleInvoiceContext } from "@/providers/sale-invoice-store-provider";
import { Minus, Plus, Trash } from "lucide-react";
import PaymentFormDialog from "./payment-form-dialog";

const tax = 0.05;
function CartSidebar() {
    const { products, increaseProductQuantity, decreaseProductQuantity, removeProduct } =
        useSaleInvoiceContext((state) => state);

    // total amount of products' price
    const totalProductsPrice = products.reduce((total, curr) => {
        return total + curr.price * curr.quantity;
    }, 0);

    return (
        <div className="sticky top-[72px] flex h-[calc(100dvh-78px)] w-[420px] flex-col overflow-hidden rounded-md border border-input bg-slate-100 dark:bg-slate-900">
            <div className="grow overflow-y-scroll">
                <table className="table w-full">
                    <thead className="sticky top-0 w-full border-b-2 border-b-slate-300 bg-slate-100 dark:border-b-slate-800 dark:bg-slate-900">
                        <tr className="w-full">
                            <th className="mb-2 w-[160px] px-2 py-4 text-start font-medium">
                                Product
                            </th>
                            <th className="mb-2 w-[130px] px-2 py-4 font-medium">Quantity</th>
                            <th className="mb-2 w-[70px] px-2 py-4 text-center font-medium">
                                Price
                            </th>
                            <th className="mb-2 w-[60px] px-2 py-4 text-end font-medium">{""}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => {
                                return (
                                    <tr key={product.productCode} className="w-full">
                                        <td className="flex-1 px-2 py-2 text-sm">
                                            {product.productName}
                                        </td>
                                        <td className="flex-1 px-2 py-2 text-center text-sm">
                                            <div className="flex w-full items-center gap-2">
                                                <div className="mx-auto flex max-w-min items-center justify-center gap-1 overflow-hidden rounded-sm">
                                                    <Button
                                                        size="icon"
                                                        className="h-5 w-5"
                                                        onClick={() => {
                                                            decreaseProductQuantity(
                                                                product.productCode,
                                                            );
                                                        }}
                                                    >
                                                        <Minus size={14} strokeWidth="3" />
                                                    </Button>
                                                    <p className="min-w-[20px] text-center">
                                                        {product.quantity}
                                                    </p>
                                                    <Button
                                                        size="icon"
                                                        className="h-5 w-5"
                                                        onClick={() => {
                                                            increaseProductQuantity(
                                                                product.productCode,
                                                            );
                                                        }}
                                                    >
                                                        <Plus size={14} strokeWidth="3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="flex-1 px-2 py-2 text-center text-sm">
                                            {product.price * product.quantity}
                                        </td>
                                        <td className="flex-1 px-2 py-2 text-end text-sm">
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                className="h-5 w-6 rounded-sm"
                                                onClick={() => {
                                                    removeProduct(product);
                                                }}
                                            >
                                                <Trash size={14} strokeWidth="3" />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="w-full">
                                <td colSpan={4} className="py-4 text-center">
                                    No Product In The Sale Invoice Yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 flex w-full flex-col gap-2 border-t border-t-slate-300 px-4 py-4 dark:border-t-slate-800">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Subtotal :</p>
                    <p className="text-sm font-medium">{totalProductsPrice}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Tax :</p>
                    <p className="text-sm font-medium">{"5%"}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="font-medium">Total :</p>
                    <p className="font-medium">
                        {Number(totalProductsPrice + totalProductsPrice * tax).toFixed(2)}
                    </p>
                </div>
                <PaymentFormDialog />
            </div>
        </div>
    );
}

export default CartSidebar;
