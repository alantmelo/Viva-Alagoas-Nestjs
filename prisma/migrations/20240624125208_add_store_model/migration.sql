-- AlterTable
ALTER TABLE `tours` ALTER COLUMN `startDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `stores` (
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
    `storeTypeId` INTEGER NULL,
    `phone` VARCHAR(50) NULL,
    `photo` VARCHAR(50) NULL,
    `instagram` VARCHAR(100) NULL,
    `openingHours` VARCHAR(256) NULL,
    `website` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stores` ADD CONSTRAINT `stores_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stores` ADD CONSTRAINT `stores_storeTypeId_fkey` FOREIGN KEY (`storeTypeId`) REFERENCES `store_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
