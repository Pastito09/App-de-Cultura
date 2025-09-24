/*
  Warnings:

  - You are about to drop the column `imageId` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `EventImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `EventImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_imageId_fkey";

-- DropIndex
DROP INDEX "Event_imageId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "EventImage" ADD COLUMN     "eventId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EventImage_eventId_key" ON "EventImage"("eventId");

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
