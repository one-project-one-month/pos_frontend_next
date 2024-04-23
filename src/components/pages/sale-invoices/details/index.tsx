"use client";
import ReactToPrint from "react-to-print";
import { cn } from "@/lib/utils";
import { useGetSaleInvoiceById } from "@/services/api/sale-invoices";
import { formatDate } from "date-fns";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface SaleInvoiceDetailsProps {
    id: string;
}
function SaleInvoiceDetails({ id }: SaleInvoiceDetailsProps) {
    const { data: saleInvoiceDetailRes, isLoading } = useGetSaleInvoiceById(id);
    const containerRef = useRef<HTMLDivElement>(null);
    const saleInvoiceDetailData = saleInvoiceDetailRes?.data.saleInvoice;
    if (isLoading || !saleInvoiceDetailData) {
        return <div>loading...</div>;
    }

    const paymentType =
        saleInvoiceDetailData.paymentType === "mobileBanking" ? "Mobile Banking" : "Cash";
    return (
        <div className="pb-10">
            <div>
                <div className="flex items-center gap-6">
                    <h4 className="text-2xl font-semibold">Sale Invoice Details</h4>
                    <ReactToPrint
                        bodyClass="px-4 py-8"
                        content={() => containerRef.current}
                        trigger={() => (
                            <Button size="sm">
                                <Printer size={16} className="mr-1" />
                                Print
                            </Button>
                        )}
                    />
                </div>
                <div className="mt-4 flex max-w-[500px] flex-col rounded-sm border border-input bg-slate-100 px-4 py-8 dark:bg-slate-900">
                    <div className="flex w-full flex-col" ref={containerRef}>
                        <h2 className="text-center text-xl font-semibold">Your POS Name</h2>
                        <div className="mx-auto my-2 flex flex-col items-center border-b-2 border-dotted border-b-primary pb-2">
                            <p className="text-sm">your shop address</p>
                            <p className="text-sm">your shop phone numbers</p>
                        </div>
                        <p className="text-center text-sm">
                            Sale made by {saleInvoiceDetailData.staff.staffName}
                        </p>
                        <div className="mt-8 flex flex-col gap-1">
                            {saleInvoiceDetailData.saleInvoiceDetails.map((product, index) => {
                                return (
                                    <div
                                        key={product.productCode}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center">
                                            {product.productCode} &nbsp;
                                            <span className="text-sm text-slate-800 dark:text-slate-200">
                                                x {product.quantity}
                                            </span>
                                        </div>
                                        <p
                                            className={cn(
                                                index ===
                                                    saleInvoiceDetailData.saleInvoiceDetails
                                                        .length -
                                                        1 &&
                                                    "border-b-2 border-dotted border-b-primary pb-2",
                                            )}
                                        >
                                            ${product.price * product.quantity}
                                        </p>
                                    </div>
                                );
                            })}

                            <div className="ml-auto flex w-1/2 items-center justify-between">
                                <p className="text-base">Subtotal</p>
                                <p className="text-base">
                                    ${Number(saleInvoiceDetailData.totalAmount).toFixed(2)}
                                </p>
                            </div>
                            <div className="ml-auto flex w-1/2 items-center justify-between">
                                <p className="text-base">Tax</p>
                                <p className="text-base">5%</p>
                            </div>
                            <div className="ml-auto flex w-1/2 items-center justify-between">
                                <p className="text-lg">TOTAL</p>
                                <p className="text-lg">
                                    ${Number(saleInvoiceDetailData.paymentAmount).toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-1">
                            {saleInvoiceDetailData.paymentType && (
                                <div className="flex items-center justify-between">
                                    <p className="text-lg capitalize">{paymentType}</p>
                                    <p className="text-lg">
                                        ${saleInvoiceDetailData.receiveAmount}
                                    </p>
                                </div>
                            )}
                            <div className="ml-auto flex w-1/2 items-center justify-between">
                                <p className="text-lg">CHANGE</p>
                                <p className="text-lg">
                                    ${saleInvoiceDetailData.change?.toFixed(2) ?? "0.00"}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <p className="mt-6 w-full text-center text-sm">
                                Voucher - {saleInvoiceDetailData.voucherNo}
                            </p>
                            <p className="text-center text-sm">
                                {formatDate(saleInvoiceDetailData.dateTime, "d/ M/ y, hh:mm")}
                            </p>
                            <p className="mt-4 text-center text-sm">
                                Thank you for shopping with us!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SaleInvoiceDetails;
