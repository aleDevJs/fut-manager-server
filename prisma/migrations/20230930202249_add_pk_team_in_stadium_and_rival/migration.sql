-- AlterTable
ALTER TABLE "rivals" ADD COLUMN     "team_id" TEXT;

-- AlterTable
ALTER TABLE "stadiums" ADD COLUMN     "team_id" TEXT;

-- AddForeignKey
ALTER TABLE "stadiums" ADD CONSTRAINT "stadiums_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rivals" ADD CONSTRAINT "rivals_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
