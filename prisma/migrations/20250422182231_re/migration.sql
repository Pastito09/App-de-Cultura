/*
  Warnings:

  - Changed the type of `eventType` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventType",
ADD COLUMN     "eventType" TEXT NOT NULL;
