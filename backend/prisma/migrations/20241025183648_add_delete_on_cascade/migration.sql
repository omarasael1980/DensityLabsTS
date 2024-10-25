-- DropForeignKey
ALTER TABLE `reply` DROP FOREIGN KEY `Reply_commentId_fkey`;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
