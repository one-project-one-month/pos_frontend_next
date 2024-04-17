/*
  Warnings:

  - Added the required column `password` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "password" TEXT NOT NULL;
