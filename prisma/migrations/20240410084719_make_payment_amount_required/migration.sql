/*
  Warnings:

  - Made the column `paymentAmount` on table `SaleInvoice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SaleInvoice" ALTER COLUMN "paymentAmount" SET NOT NULL;
