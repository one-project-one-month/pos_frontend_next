/*
  Warnings:

  - A unique constraint covering the columns `[productCategoryName]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_productCategoryName_key" ON "ProductCategory"("productCategoryName");
