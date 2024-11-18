-- CreateTable
CREATE TABLE "Document" (
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
