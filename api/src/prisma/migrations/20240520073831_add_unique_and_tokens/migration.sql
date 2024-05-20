/*
  Warnings:

  - You are about to drop the column `usedAt` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "usedAt",
ADD COLUMN     "expires_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password";

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
