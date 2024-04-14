/*
  Warnings:

  - You are about to drop the column `cusotmerCode` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerCode]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerCode` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_cusotmerCode_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "cusotmerCode",
ADD COLUMN     "customerCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerCode_key" ON "Customer"("customerCode");
