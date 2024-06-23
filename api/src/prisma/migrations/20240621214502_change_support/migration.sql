/*
  Warnings:

  - You are about to drop the `supports` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `plans` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `cabinets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "supports" DROP CONSTRAINT "supports_cabinet_id_fkey";

-- DropForeignKey
ALTER TABLE "supports" DROP CONSTRAINT "supports_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "supports" DROP CONSTRAINT "supports_status_id_fkey";

-- AlterTable
ALTER TABLE "cabinets" ADD COLUMN     "description" TEXT NOT NULL;

-- DropTable
DROP TABLE "supports";

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "has_files" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messagesFiles" (
    "id" SERIAL NOT NULL,
    "messages_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,

    CONSTRAINT "messagesFiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plans_title_key" ON "plans"("title");

-- CreateIndex
CREATE UNIQUE INDEX "roles_title_key" ON "roles"("title");

-- AddForeignKey
ALTER TABLE "messagesFiles" ADD CONSTRAINT "messagesFiles_messages_id_fkey" FOREIGN KEY ("messages_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
