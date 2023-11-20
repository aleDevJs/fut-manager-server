/*
  Warnings:

  - The primary key for the `matches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `players` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rivals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `stadiums` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `teams` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_rival_id_fkey";

-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_stadium_id_fkey";

-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_team_id_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_team_id_fkey";

-- AlterTable
ALTER TABLE "matches" DROP CONSTRAINT "matches_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "team_id" SET DATA TYPE TEXT,
ALTER COLUMN "rival_id" SET DATA TYPE TEXT,
ALTER COLUMN "stadium_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "matches_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "matches_id_seq";

-- AlterTable
ALTER TABLE "players" DROP CONSTRAINT "players_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "team_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "players_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "players_id_seq";

-- AlterTable
ALTER TABLE "rivals" DROP CONSTRAINT "rivals_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "rivals_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "rivals_id_seq";

-- AlterTable
ALTER TABLE "stadiums" DROP CONSTRAINT "stadiums_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "stadiums_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "stadiums_id_seq";

-- AlterTable
ALTER TABLE "teams" DROP CONSTRAINT "teams_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "teams_id_seq";

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_rival_id_fkey" FOREIGN KEY ("rival_id") REFERENCES "rivals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "stadiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
