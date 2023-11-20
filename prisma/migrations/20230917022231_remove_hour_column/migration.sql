/*
  Warnings:

  - You are about to drop the column `hour` on the `matches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "hour",
ALTER COLUMN "rival_goals" SET DEFAULT 0,
ALTER COLUMN "team_goals" SET DEFAULT 0;
