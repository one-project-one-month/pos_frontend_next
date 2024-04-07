export type SaleInvoiceDetailType = {
    voucherNo: string;
    productCode: string;
    quantity: number;
    price: number;
    amount: number;
};

export type InputProductType = { productCode: string; quantity: number };

type SaleInvoiceCashType = {
    paymentType: "cash";
    staffCode: string;
    products: InputProductType[];
};

type SaleInvoiceMobileBankingType = {
    paymentType: "mobileBanking";
    paymentAmount: number;
    receiveAmount: number;
    staffCode: string;
    products: InputProductType[];
};

export type SaleInvoiceType = SaleInvoiceCashType | SaleInvoiceMobileBankingType;
