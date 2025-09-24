/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDescription` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventLocation` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventLocationName` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTitle` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "location",
DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "eventDescription" TEXT NOT NULL,
ADD COLUMN     "eventLocation" TEXT NOT NULL,
ADD COLUMN     "eventLocationName" TEXT NOT NULL,
ADD COLUMN     "eventTitle" TEXT NOT NULL,
ADD COLUMN     "eventType" "EventType" NOT NULL,
ADD COLUMN     "tags" TEXT[];
