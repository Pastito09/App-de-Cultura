/*
  Warnings:

  - You are about to drop the column `eventId` on the `EventImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EventImage" DROP CONSTRAINT "EventImage_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "EventImage" DROP COLUMN "eventId";

-- CreateIndex
CREATE UNIQUE INDEX "Event_imageId_key" ON "Event"("imageId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "EventImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
