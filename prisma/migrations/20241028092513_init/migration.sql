-- CreateTable
CREATE TABLE "TopSharesList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "ipoDate" TIMESTAMP(3) NOT NULL,
    "volume" BIGINT NOT NULL,
    "type" TEXT DEFAULT 'share',

    CONSTRAINT "TopSharesList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharesData" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "volume" BIGINT NOT NULL,

    CONSTRAINT "SharesData_pkey" PRIMARY KEY ("id")
);
