/*
  Warnings:

  - The values [JUNIOR,MIDDLE,SENIOR] on the enum `Experience` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Experience_new" AS ENUM ('Начальный', 'Средний', 'Опытный', 'Любой');
ALTER TABLE "vacancies" ALTER COLUMN "experience" DROP DEFAULT;
ALTER TABLE "vacancies" ALTER COLUMN "experience" TYPE "Experience_new" USING ("experience"::text::"Experience_new");
ALTER TYPE "Experience" RENAME TO "Experience_old";
ALTER TYPE "Experience_new" RENAME TO "Experience";
DROP TYPE "Experience_old";
ALTER TABLE "vacancies" ALTER COLUMN "experience" SET DEFAULT 'Начальный';
COMMIT;

-- AlterTable
ALTER TABLE "vacancies" ALTER COLUMN "experience" SET DEFAULT 'Начальный';
