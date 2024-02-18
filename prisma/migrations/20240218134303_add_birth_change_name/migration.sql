/*
  Warnings:

  - You are about to drop the column `birth_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `birth_at`,
    ADD COLUMN `birthAt` DATE NULL;
