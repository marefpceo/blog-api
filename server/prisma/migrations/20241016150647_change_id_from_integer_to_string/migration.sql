/*
  Warnings:

  - The primary key for the `Count` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Count" DROP CONSTRAINT "Count_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Count_pkey" PRIMARY KEY ("id");
