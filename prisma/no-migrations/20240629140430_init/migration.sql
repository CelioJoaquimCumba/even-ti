/*
  Warnings:

  - You are about to drop the column `organizerId` on the `EventOrganizer` table. All the data in the column will be lost.
  - Added the required column `communityId` to the `EventOrganizer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventOrganizer" DROP CONSTRAINT "EventOrganizer_organizerId_fkey";

-- AlterTable
ALTER TABLE "EventOrganizer" DROP COLUMN "organizerId",
ADD COLUMN     "communityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EventOrganizer" ADD CONSTRAINT "EventOrganizer_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
