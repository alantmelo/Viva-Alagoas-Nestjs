/*
  Warnings:

  - You are about to drop the column `locationId` on the `tours` table. All the data in the column will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tours` DROP FOREIGN KEY `tours_locationId_fkey`;

-- AlterTable
ALTER TABLE `tours` DROP COLUMN `locationId`,
    ADD COLUMN `cityId` INTEGER NULL,
    ALTER COLUMN `startDate` DROP DEFAULT;

-- DropTable
DROP TABLE `locations`;

-- AddForeignKey
ALTER TABLE `tours` ADD CONSTRAINT `tours_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
