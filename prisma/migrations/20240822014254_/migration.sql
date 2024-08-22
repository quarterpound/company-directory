/*
  Warnings:

  - You are about to drop the column `claim_id` on the `company` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `claim` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_claim_id_fkey";

-- AlterTable
ALTER TABLE "claim" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "company" DROP COLUMN "claim_id";

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
