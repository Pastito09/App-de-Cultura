/*
  Warnings:

  - Made the column `imageId` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `eventType` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_imageId_fkey";

-- DropIndex
DROP INDEX "Event_imageId_key";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "imageId" SET NOT NULL,
DROP COLUMN "eventType",
ADD COLUMN     "eventType" "EventType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "EventImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
