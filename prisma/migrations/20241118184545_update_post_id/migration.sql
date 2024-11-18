/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "document_id_key" ON "document"("id");
