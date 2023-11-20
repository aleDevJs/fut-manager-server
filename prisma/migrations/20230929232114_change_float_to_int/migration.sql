/*
  Warnings:

  - You are about to alter the column `height` on the `players` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `weight` on the `players` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `salary` on the `players` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "players" ALTER COLUMN "height" SET DATA TYPE INTEGER,
ALTER COLUMN "weight" SET DATA TYPE INTEGER,
ALTER COLUMN "salary" SET DATA TYPE INTEGER;
