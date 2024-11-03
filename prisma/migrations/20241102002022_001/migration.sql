-- CreateTable
CREATE TABLE `users` (
    `id_user` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `typeUser` ENUM('admin', 'regular') NOT NULL DEFAULT 'regular',
    `autenticated` BOOLEAN NOT NULL DEFAULT false,
    `code` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
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
CREATE TABLE `Price` (
    `id_price` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `value` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_price`)
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
