/*
  Warnings:

  - Made the column `team_id` on table `rivals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `team_id` on table `stadiums` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "rivals" DROP CONSTRAINT "rivals_team_id_fkey";

-- DropForeignKey
ALTER TABLE "stadiums" DROP CONSTRAINT "stadiums_team_id_fkey";

-- AlterTable
ALTER TABLE "rivals" ALTER COLUMN "team_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "stadiums" ALTER COLUMN "team_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "stadiums" ADD CONSTRAINT "stadiums_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rivals" ADD CONSTRAINT "rivals_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
