-- AlterTable
ALTER TABLE `cities` MODIFY `description` TEXT NULL,
    MODIFY `geolocation` VARCHAR(20) NULL,
    MODIFY `youtube` VARCHAR(255) NULL,
    MODIFY `state` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `beaches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `geolocation` VARCHAR(200) NOT NULL,
    `youtube` VARCHAR(200) NULL,
    `description` TEXT NULL,
    `directions` TEXT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `street` VARCHAR(200) NULL,
    `neighborhood` VARCHAR(200) NULL,
    `number` VARCHAR(10) NULL,
    `additionalAddress` TEXT NULL,
    `zipeCode` VARCHAR(25) NULL,
    `cityId` INTEGER NULL,

    UNIQUE INDEX `beaches_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `beaches` ADD CONSTRAINT `beaches_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
