import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    useCreateSaleInvoice,
    useUpdateInvoiceAndConfirmPayment,
} from "@/services/api/sale-invoices";
import { useSaleInvoiceContext } from "@/providers/sale-invoice-store-provider";
import { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next-nprogress-bar";

const paymentFormSchema = z.object({
    receiveAmount: z.number().gt(0),
    paymentType: z.string().min(1, "Payment Type is required"),
});

function PaymentFormDialog({ totalAmount }: { totalAmount: number }) {
    const router = useRouter();
    const { mutate: createSaleInvoice, isPending: isCreating } = useCreateSaleInvoice();
    const { mutate: confirmPayment, isPending: isUpdating } = useUpdateInvoiceAndConfirmPayment();
    const { products, resetProduct, staffCode } = useSaleInvoiceContext((state) => state);
    const dialogCloseBtnRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof paymentFormSchema>>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            paymentType: "cash",
            receiveAmount: 0,
        },
    });

    const onSubmit = (values: z.infer<typeof paymentFormSchema>) => {
        toast.info("Making the request...", { id: "info-toast" });
        createSaleInvoice(
            { staffCode: staffCode || "s00", products },
            {
                onSuccess: (responseData) => {
                    console.log(responseData);
                    const voucherNo = responseData.data.saleInvoice.voucherNo;
                    const invoiceId = responseData.data.saleInvoice.saleInvoiceId;

                    if (values.receiveAmount < responseData.data.saleInvoice.paymentAmount) {
                        toast.error("Receive amount is less than the actual payment amount!");
                        return;
                    }

                    confirmPayment(
                        {
                            receiveAmount: values.receiveAmount,
                            paymentType: values.paymentType as "cash" | "mobileBanking",
                            voucherNo: voucherNo,
                        },
                        {
                            onError: (err) => {
                                console.error(err);
                                toast.error("Fail to create new sale invoice!");
                            },
                            onSuccess: () => {
                                toast.success("Payment finished!");
                                resetProduct();
                                dialogCloseBtnRef.current?.click();
                                router.push(`/sale-invoices/${invoiceId}`);
                            },
                            onSettled: () => {
                                toast.dismiss("info-toast");
                            },
                        },
                    );
                },
                onError: (err) => {
                    console.error(err);
                    toast.error("Fail to create new sale invoice!");
                },
                onSettled: () => {
                    toast.dismiss("info-toast");
                },
            },
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild ref={dialogCloseBtnRef}>
                <Button className="w-full" disabled={products.length === 0}>
                    Checkout
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm payment</DialogTitle>
                    <DialogHeader>Total Amount - {totalAmount}</DialogHeader>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="receiveAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Received Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="any"
                                            placeholder="Enter Amount"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(parseFloat(e.target.value));
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paymentType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Payment Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex items-center gap-2">
                                            <FormItem className="flex items-center space-x-1.5 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="cash" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Cash</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-1.5 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="mobileBanking" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Mobile Banking
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isCreating || isUpdating}>
                            Finish Payment
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default PaymentFormDialog;
