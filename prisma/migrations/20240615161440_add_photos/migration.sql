-- AlterTable
ALTER TABLE `photos` ADD COLUMN `beachId` INTEGER NULL,
    ADD COLUMN `cityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_beachId_fkey` FOREIGN KEY (`beachId`) REFERENCES `beaches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
