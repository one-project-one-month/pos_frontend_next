/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('cash', 'mobileBanking');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('cashier', 'admin');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Shop" (
    "shopId" TEXT NOT NULL,
    "shopCode" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("shopId")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffId" TEXT NOT NULL,
    "staffCode" TEXT NOT NULL,
    "staffName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "position" "Position" NOT NULL DEFAULT 'cashier',

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "productCode" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "categoryCode" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "productCategoryId" TEXT NOT NULL,
    "productCategoryCode" TEXT NOT NULL,
    "productCategoryName" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productCategoryId")
);

-- CreateTable
CREATE TABLE "SaleInvoice" (
    "saleInvoiceId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voucherNo" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "paymentType" "PaymentType" NOT NULL,
    "paymentAmount" DOUBLE PRECISION,
    "receiveAmount" DOUBLE PRECISION,
    "change" DOUBLE PRECISION,
    "staffCode" TEXT NOT NULL,

    CONSTRAINT "SaleInvoice_pkey" PRIMARY KEY ("saleInvoiceId")
);

-- CreateTable
CREATE TABLE "SaleInvoiceDetails" (
    "saleInvoiceDetailsId" TEXT NOT NULL,
    "voucherNo" TEXT NOT NULL,
    "productCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SaleInvoiceDetails_pkey" PRIMARY KEY ("saleInvoiceDetailsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_shopCode_key" ON "Shop"("shopCode");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffCode_key" ON "Staff"("staffCode");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productCode_key" ON "Product"("productCode");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_productCategoryCode_key" ON "ProductCategory"("productCategoryCode");

-- CreateIndex
CREATE UNIQUE INDEX "SaleInvoice_voucherNo_key" ON "SaleInvoice"("voucherNo");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryCode_fkey" FOREIGN KEY ("categoryCode") REFERENCES "ProductCategory"("productCategoryCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleInvoice" ADD CONSTRAINT "SaleInvoice_staffCode_fkey" FOREIGN KEY ("staffCode") REFERENCES "Staff"("staffCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleInvoiceDetails" ADD CONSTRAINT "SaleInvoiceDetails_voucherNo_fkey" FOREIGN KEY ("voucherNo") REFERENCES "SaleInvoice"("voucherNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleInvoiceDetails" ADD CONSTRAINT "SaleInvoiceDetails_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "Product"("productCode") ON DELETE RESTRICT ON UPDATE CASCADE;
