/*
  Warnings:

  - You are about to drop the `capacitys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categorys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `displays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie_reserves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reserves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `capacitys` DROP FOREIGN KEY `capacitys_movieId_movie_fkey`;

-- DropForeignKey
ALTER TABLE `capacitys` DROP FOREIGN KEY `capacitys_priceId_price_fkey`;

-- DropForeignKey
ALTER TABLE `categorys` DROP FOREIGN KEY `categorys_movieId_movie_fkey`;

-- DropForeignKey
ALTER TABLE `displays` DROP FOREIGN KEY `displays_movieId_movie_fkey`;

-- DropForeignKey
ALTER TABLE `movie_reserves` DROP FOREIGN KEY `movie_Reserves_movieId_movie_fkey`;

-- DropForeignKey
ALTER TABLE `movie_reserves` DROP FOREIGN KEY `movie_Reserves_reserveId_reserve_fkey`;

-- DropTable
DROP TABLE `capacitys`;

-- DropTable
DROP TABLE `categorys`;

-- DropTable
DROP TABLE `displays`;

-- DropTable
DROP TABLE `movie_reserves`;

-- DropTable
DROP TABLE `movies`;

-- DropTable
DROP TABLE `reserves`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `user` (
    `id_user` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `typeUser` ENUM('admin', 'regular') NOT NULL DEFAULT 'regular',
    `autenticated` BOOLEAN NOT NULL DEFAULT false,
    `code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_code_key`(`code`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie` (
    `id_movie` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `imagem` TEXT NOT NULL,
    `status` ENUM('available', 'canceled', 'exhausted', 'ongoing') NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `categoryId_category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_movie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id_category` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `movieId_movie` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `display` (
    `id_display` VARCHAR(191) NOT NULL,
    `time` TIME NOT NULL,
    `date` DATE NOT NULL,
    `movieId_movie` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_display`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacity` (
    `id_capicity` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `accents` TEXT NOT NULL,
    `movieId_movie` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `priceId_price` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_capicity`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserve` (
    `id_reserve` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_reserve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_Reserve` (
    `id_movie_reserve` VARCHAR(191) NOT NULL,
    `reserveId_reserve` VARCHAR(191) NOT NULL,
    `movieId_movie` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_movie_reserve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_movieId_movie_fkey` FOREIGN KEY (`movieId_movie`) REFERENCES `movie`(`id_movie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `display` ADD CONSTRAINT `display_movieId_movie_fkey` FOREIGN KEY (`movieId_movie`) REFERENCES `movie`(`id_movie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity` ADD CONSTRAINT `capacity_movieId_movie_fkey` FOREIGN KEY (`movieId_movie`) REFERENCES `movie`(`id_movie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity` ADD CONSTRAINT `capacity_priceId_price_fkey` FOREIGN KEY (`priceId_price`) REFERENCES `Price`(`id_price`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_Reserve` ADD CONSTRAINT `movie_Reserve_reserveId_reserve_fkey` FOREIGN KEY (`reserveId_reserve`) REFERENCES `reserve`(`id_reserve`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_Reserve` ADD CONSTRAINT `movie_Reserve_movieId_movie_fkey` FOREIGN KEY (`movieId_movie`) REFERENCES `movie`(`id_movie`) ON DELETE RESTRICT ON UPDATE CASCADE;
