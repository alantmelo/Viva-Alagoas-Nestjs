-- CreateTable
CREATE TABLE `restaurant_to_restaurant_types` (
    `restaurantId` INTEGER NOT NULL,
    `restaurantTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`restaurantId`, `restaurantTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `restaurant_to_restaurant_types` ADD CONSTRAINT `restaurant_to_restaurant_types_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant_to_restaurant_types` ADD CONSTRAINT `restaurant_to_restaurant_types_restaurantTypeId_fkey` FOREIGN KEY (`restaurantTypeId`) REFERENCES `restaurant_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
