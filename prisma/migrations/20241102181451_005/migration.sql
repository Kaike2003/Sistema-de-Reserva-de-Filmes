/*
  Warnings:

  - You are about to drop the `capacity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `display` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie_reserve` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reserve` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `capacity` DROP FOREIGN KEY `capacity_movieId_movie_fkey`;

-- DropForeignKey
ALTER TABLE `capacity` DROP FOREIGN KEY `capacity_priceId_price_fkey`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_movieId_movie_fkey`;

-- DropForeignKey
ALTER TABLE `display` DROP FOREIGN KEY `display_movieId_movie_fkey`;

-- DropForeignKey
ALTER TABLE `movie_reserve` DROP FOREIGN KEY `movie_Reserve_movieId_movie_fkey`;

-- DropForeignKey
ALTER TABLE `movie_reserve` DROP FOREIGN KEY `movie_Reserve_reserveId_reserve_fkey`;

-- DropTable
DROP TABLE `capacity`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `display`;

-- DropTable
DROP TABLE `movie`;

-- DropTable
DROP TABLE `movie_reserve`;

-- DropTable
DROP TABLE `reserve`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id_user` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `typeUser` ENUM('admin', 'regular') NOT NULL DEFAULT 'regular',
    `autenticated` BOOLEAN NOT NULL DEFAULT false,
    `code` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_code_key`(`code`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
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
CREATE TABLE `categorys` (
    `id_category` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `movieId_movie` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `displays` (
    `id_display` VARCHAR(191) NOT NULL,
    `time` TIME NOT NULL,
    `date` DATE NOT NULL,
    `movieId_movie` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_display`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacitys` (
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
CREATE TABLE `reserves` (
    `id_reserve` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_reserve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_Reserves` (
    `id_movie_reserve` VARCHAR(191) NOT NULL,
    `reserveId_reserve` VARCHAR(191) NOT NULL,
    `movieId_movie` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_movie_reserve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categorys` ADD CONSTRAINT `categorys_movieId_movie_fkey` FOREIGN KEY (`movieId_movie`) REFERENCES `movies`(`id_movie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `displays` ADD CONSTRAINT `displays_movieId_movie_fkey` FOREIGN KEY (`movieId_movie`) REFERENCES `movies`(`id_movie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacitys` ADD CONSTRAINT `capacitys_movieId_movie_fkey` FOREIGN KEY (`movieId_movie`) REFERENCES `movies`(`id_movie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacitys` ADD CONSTRAINT `capacitys_priceId_price_fkey` FOREIGN KEY (`priceId_price`) REFERENCES `Price`(`id_price`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_Reserves` ADD CONSTRAINT `movie_Reserves_reserveId_reserve_fkey` FOREIGN KEY (`reserveId_reserve`) REFERENCES `reserves`(`id_reserve`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_Reserves` ADD CONSTRAINT `movie_Reserves_movieId_movie_fkey` FOREIGN KEY (`movieId_movie`) REFERENCES `movies`(`id_movie`) ON DELETE RESTRICT ON UPDATE CASCADE;
