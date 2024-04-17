/*
  Warnings:

  - Added the required column `password` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "cusotmerCode" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerMobilNo" TEXT NOT NULL,
    "customerDOB" TIMESTAMP(3) NOT NULL,
    "customerGender" "Gender" NOT NULL,
    "cusotmerStateCode" INTEGER NOT NULL,
    "customerTownShipCode" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cusotmerCode_key" ON "Customer"("cusotmerCode");
