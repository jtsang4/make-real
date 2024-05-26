-- CreateTable
CREATE TABLE "Links" (
    "shapeId" TEXT NOT NULL PRIMARY KEY,
    "html" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Links_shapeId_idx" ON "Links"("shapeId");
