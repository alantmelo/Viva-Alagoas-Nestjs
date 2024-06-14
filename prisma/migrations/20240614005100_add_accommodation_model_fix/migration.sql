/*
  Warnings:

  - You are about to drop the `_AccommodationToAccommodationType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AccommodationToAccommodationType` DROP FOREIGN KEY `_AccommodationToAccommodationType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AccommodationToAccommodationType` DROP FOREIGN KEY `_AccommodationToAccommodationType_B_fkey`;

-- AlterTable
ALTER TABLE `accommodations` ADD COLUMN `AccommodationTypeId` INTEGER NULL;

-- DropTable
DROP TABLE `_AccommodationToAccommodationType`;

-- AddForeignKey
ALTER TABLE `accommodations` ADD CONSTRAINT `accommodations_AccommodationTypeId_fkey` FOREIGN KEY (`AccommodationTypeId`) REFERENCES `accommodation_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
