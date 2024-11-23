/*
  Warnings:

  - Added the required column `shippingCompany` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackingNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `shippingCompany` VARCHAR(191) NOT NULL,
    ADD COLUMN `trackingNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `category` ENUM('SOFTWARE', 'HARDWARE') NOT NULL;
