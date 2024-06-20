-- AlterTable
ALTER TABLE `tours` ALTER COLUMN `startDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `tour_to_tour_type` (
    `tourId` INTEGER NOT NULL,
    `tourTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`tourId`, `tourTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tour_to_tour_type` ADD CONSTRAINT `fk_tour_to_tour_type` FOREIGN KEY (`tourId`) REFERENCES `tours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tour_to_tour_type` ADD CONSTRAINT `fk_tour_to_tour_type_tour_` FOREIGN KEY (`tourTypeId`) REFERENCES `tour_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
