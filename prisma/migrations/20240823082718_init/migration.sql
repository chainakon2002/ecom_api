/*
  Warnings:

  - You are about to drop the column `productId` on the `payment` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pay` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_productId_fkey`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `productId`,
    ADD COLUMN `orderId` INTEGER NOT NULL,
    ADD COLUMN `pay` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
