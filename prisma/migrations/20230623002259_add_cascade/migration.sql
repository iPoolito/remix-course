-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "raiting" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "restaurantTypeId" INTEGER NOT NULL,
    CONSTRAINT "Restaurant_restaurantTypeId_fkey" FOREIGN KEY ("restaurantTypeId") REFERENCES "RestaurantType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Restaurant" ("createdAt", "id", "name", "raiting", "restaurantTypeId", "updatedAt") SELECT "createdAt", "id", "name", "raiting", "restaurantTypeId", "updatedAt" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
CREATE TABLE "new_Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "restaurantId" INTEGER,
    CONSTRAINT "Food_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Food" ("createdAt", "id", "name", "restaurantId", "updatedAt") SELECT "createdAt", "id", "name", "restaurantId", "updatedAt" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
