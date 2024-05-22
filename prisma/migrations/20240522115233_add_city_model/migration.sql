-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `geolocation` VARCHAR(20) NOT NULL,
    `youtube` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `cities_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
