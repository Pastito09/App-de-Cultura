-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventLocationMap" TEXT,
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[];
