-- AlterTable
ALTER TABLE `photos` ADD COLUMN `accomodationId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_accomodationId_fkey` FOREIGN KEY (`accomodationId`) REFERENCES `accommodations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
