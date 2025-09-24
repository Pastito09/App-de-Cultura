/*
  Warnings:

  - The values [CONCIERTO,TEATRO,FIESTA,FERIA,OTROS] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imageId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - Added the required column `image` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `ticketPrice` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `eventType` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `eventId` to the `EventImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('concierto', 'teatro', 'fiesta', 'feria', 'otros');
ALTER TABLE "Event" ALTER COLUMN "eventType" TYPE "EventType_new" USING ("eventType"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT NOT NULL,
ALTER COLUMN "ticketPrice" SET NOT NULL,
ALTER COLUMN "ticketPrice" DROP DEFAULT,
ALTER COLUMN "userId" SET NOT NULL,
DROP COLUMN "eventType",
ADD COLUMN     "eventType" "EventType" NOT NULL;

-- AlterTable
ALTER TABLE "EventImage" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "image",
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "verifiedMail" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
