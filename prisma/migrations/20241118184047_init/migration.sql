/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Document";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "document" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "emittor" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_origin" TEXT NOT NULL,
    "liquid_value" INTEGER NOT NULL,
    "attr_value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
