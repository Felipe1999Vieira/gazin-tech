/*
  Warnings:

  - Changed the type of `sexo` on the `Desenvolvedor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- AlterTable
ALTER TABLE "Desenvolvedor" DROP COLUMN "sexo",
ADD COLUMN     "sexo" "Sexo" NOT NULL;
