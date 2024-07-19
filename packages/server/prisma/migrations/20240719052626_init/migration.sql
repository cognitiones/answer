/*
  Warnings:

  - Added the required column `stem` to the `Programming` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submitCheck` to the `Programming` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Programming` ADD COLUMN `stem` VARCHAR(191) NOT NULL,
    ADD COLUMN `submitCheck` VARCHAR(191) NOT NULL;
