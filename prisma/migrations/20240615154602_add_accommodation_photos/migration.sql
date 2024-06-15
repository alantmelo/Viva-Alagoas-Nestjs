-- DropForeignKey
ALTER TABLE `photos` DROP FOREIGN KEY `photos_accomodationId_fkey`;

-- DropForeignKey
ALTER TABLE `photos` DROP FOREIGN KEY `photos_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `photos` MODIFY `restaurantId` INTEGER NULL,
    MODIFY `accomodationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_accomodationId_fkey` FOREIGN KEY (`accomodationId`) REFERENCES `accommodations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
