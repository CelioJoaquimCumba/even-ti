/*
  Warnings:

  - Added the required column `tagLine` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tagLine" TEXT NOT NULL;
