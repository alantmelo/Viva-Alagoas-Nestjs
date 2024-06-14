/*
  Warnings:

  - You are about to drop the `restauran_service_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `restaurant_to_service_types` DROP FOREIGN KEY `restaurant_to_service_types_restaurantServiceTypeId_fkey`;

-- AlterTable
ALTER TABLE `restaurants` ADD COLUMN `openingHours` VARCHAR(256) NULL;

-- DropTable
DROP TABLE `restauran_service_types`;

-- CreateTable
CREATE TABLE `restaurant_service_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accommodations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `directions` TEXT NULL,
    `geolocation` VARCHAR(200) NULL,
    `youtube` VARCHAR(200) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `street` VARCHAR(200) NULL,
    `neighborhood` VARCHAR(200) NULL,
    `number` VARCHAR(10) NULL,
    `additionalAddress` TEXT NULL,
    `zipeCode` VARCHAR(25) NULL,
    `cityId` INTEGER NULL,
    `phone` VARCHAR(50) NULL,
    `photo` VARCHAR(50) NULL,
    `instagram` VARCHAR(100) NULL,
    `openingHours` VARCHAR(256) NULL,
    `website` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AccommodationToAccommodationType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AccommodationToAccommodationType_AB_unique`(`A`, `B`),
    INDEX `_AccommodationToAccommodationType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `restaurant_to_service_types` ADD CONSTRAINT `restaurant_to_service_types_restaurantServiceTypeId_fkey` FOREIGN KEY (`restaurantServiceTypeId`) REFERENCES `restaurant_service_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodations` ADD CONSTRAINT `accommodations_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccommodationToAccommodationType` ADD CONSTRAINT `_AccommodationToAccommodationType_A_fkey` FOREIGN KEY (`A`) REFERENCES `accommodations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AccommodationToAccommodationType` ADD CONSTRAINT `_AccommodationToAccommodationType_B_fkey` FOREIGN KEY (`B`) REFERENCES `accommodation_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
