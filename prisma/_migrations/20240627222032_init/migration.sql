/*
  Warnings:

  - You are about to drop the `Speaker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventSpeaker" DROP CONSTRAINT "EventSpeaker_speakerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT NOT NULL;

-- DropTable
DROP TABLE "Speaker";

-- AddForeignKey
ALTER TABLE "EventSpeaker" ADD CONSTRAINT "EventSpeaker_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
