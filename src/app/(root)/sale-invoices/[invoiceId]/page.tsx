import SaleInvoiceDetails from "@/components/pages/sale-invoices/details";
import { NextPage } from "next";

const SaleInvoiceDetailPage: NextPage<{ params: { invoiceId: string } }> = ({ params }) => {
    return <SaleInvoiceDetails id={params.invoiceId} />;
};

export default SaleInvoiceDetailPage;
