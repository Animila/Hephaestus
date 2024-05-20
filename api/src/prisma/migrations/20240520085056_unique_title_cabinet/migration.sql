/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `cabinets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cabinets_title_key" ON "cabinets"("title");
