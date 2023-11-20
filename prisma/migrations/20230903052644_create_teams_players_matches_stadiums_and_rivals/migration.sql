/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT;

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "shield" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "position" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "isInjured" BOOLEAN NOT NULL,
    "team_id" INTEGER NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" TEXT NOT NULL,
    "rival_goals" INTEGER NOT NULL,
    "team_goals" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "rival_id" INTEGER NOT NULL,
    "stadium_id" INTEGER NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stadiums" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "stadiums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rivals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shield" TEXT NOT NULL,

    CONSTRAINT "rivals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_rival_id_fkey" FOREIGN KEY ("rival_id") REFERENCES "rivals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "stadiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
