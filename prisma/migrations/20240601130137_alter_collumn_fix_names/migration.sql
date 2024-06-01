/*
  Warnings:

  - You are about to drop the `accommodation_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restauran_service_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `restaurant_to_service_types` DROP FOREIGN KEY `restaurant_to_service_types_restaurantServiceTypeId_fkey`;

-- DropTable
DROP TABLE `accommodation_type`;

-- DropTable
DROP TABLE `restauran_service_type`;

-- DropTable
DROP TABLE `service_type`;

-- CreateTable
CREATE TABLE `accommodation_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restauran_service_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `restaurant_to_service_types` ADD CONSTRAINT `restaurant_to_service_types_restaurantServiceTypeId_fkey` FOREIGN KEY (`restaurantServiceTypeId`) REFERENCES `restauran_service_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
