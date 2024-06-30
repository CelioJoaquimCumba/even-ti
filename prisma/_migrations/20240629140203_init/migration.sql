/*
  Warnings:

  - You are about to drop the `Organizer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventOrganizer" DROP CONSTRAINT "EventOrganizer_organizerId_fkey";

-- DropTable
DROP TABLE "Organizer";

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventOrganizer" ADD CONSTRAINT "EventOrganizer_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
