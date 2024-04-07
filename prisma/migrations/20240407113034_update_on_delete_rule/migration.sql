-- DropForeignKey
ALTER TABLE "SaleInvoiceDetails" DROP CONSTRAINT "SaleInvoiceDetails_voucherNo_fkey";

-- AddForeignKey
ALTER TABLE "SaleInvoiceDetails" ADD CONSTRAINT "SaleInvoiceDetails_voucherNo_fkey" FOREIGN KEY ("voucherNo") REFERENCES "SaleInvoice"("voucherNo") ON DELETE CASCADE ON UPDATE CASCADE;
