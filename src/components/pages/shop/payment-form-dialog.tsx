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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const paymentFormSchema = z.object({
    receiveAmount: z.number().gt(0),
    paymentType: z.string().min(1, "Payment Type is required"),
});

function PaymentFormDialog() {
    const router = useRouter();
    const { mutate: createSaleInvoice, isPending: isCreating } = useCreateSaleInvoice();
    const { mutate: confirmPayment, isPending: isUpdating } = useUpdateInvoiceAndConfirmPayment();
    const { products, resetProduct } = useSaleInvoiceContext((state) => state);
    const dialogCloseBtnRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof paymentFormSchema>>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            paymentType: "cash",
            receiveAmount: 0,
        },
    });

    const onSubmit = (values: z.infer<typeof paymentFormSchema>) => {
        createSaleInvoice(
            // TO-DO: staff code is hardcoded for now, have to replace with logged in staff code later
            { staffCode: "s00", products },
            {
                onSuccess: (responseData) => {
                    console.log(responseData);
                    const voucherNo = responseData.data.saleInvoice.voucherNo;
                    const invoiceId = responseData.data.saleInvoice.saleInvoiceId;
                    confirmPayment(
                        {
                            ...values,
                            voucherNo: voucherNo,
                        },
                        {
                            onError: (err) => {
                                console.error(err);
                                toast.error("Fail to create new sale invoice!");
                            },
                            onSuccess: () => {
                                console.log("success");
                                resetProduct();
                                dialogCloseBtnRef.current?.click();
                                router.push(`/sale-invoices/${invoiceId}`);
                            },
                        },
                    );
                },
                onError: (err) => {
                    console.error(err);
                    toast.error("Fail to create new sale invoice!");
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
                                            placeholder="Enter Amount"
                                            {...field}
                                            onChange={(e) => {
                                                form.setValue(
                                                    "receiveAmount",
                                                    Number(e.target.value),
                                                );
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
                                            className="flex items-center gap-2"
                                        >
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
                        <Button type="submit" disabled={isCreating || isUpdating}>
                            Finish Payment
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default PaymentFormDialog;
