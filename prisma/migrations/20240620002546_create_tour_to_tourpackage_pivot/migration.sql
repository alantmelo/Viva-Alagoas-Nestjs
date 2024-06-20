-- AlterTable
ALTER TABLE `tours` ALTER COLUMN `startDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `tour_packages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tour_to_tour_package` (
    `tourId` INTEGER NOT NULL,
    `tourPackageId` INTEGER NOT NULL,

    PRIMARY KEY (`tourId`, `tourPackageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tour_to_tour_package` ADD CONSTRAINT `fk_tour_to_tour_package_tour` FOREIGN KEY (`tourId`) REFERENCES `tours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tour_to_tour_package` ADD CONSTRAINT `fk_tour_to_tour_package_tour_package` FOREIGN KEY (`tourPackageId`) REFERENCES `tour_packages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
