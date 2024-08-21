-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speciality" (
    "id" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "speciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "industry" (
    "id" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speciality_on_company" (
    "company_id" INTEGER NOT NULL,
    "speciality_id" INTEGER NOT NULL,

    CONSTRAINT "speciality_on_company_pkey" PRIMARY KEY ("speciality_id","company_id")
);

-- CreateTable
CREATE TABLE "services_on_company" (
    "service_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "services_on_company_pkey" PRIMARY KEY ("service_id","company_id")
);

-- CreateTable
CREATE TABLE "industry_on_company" (
    "industry_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "industry_on_company_pkey" PRIMARY KEY ("industry_id","company_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "city_slug_key" ON "city"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "speciality_slug_key" ON "speciality"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "service_slug_key" ON "service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "industry_slug_key" ON "industry"("slug");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speciality_on_company" ADD CONSTRAINT "speciality_on_company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speciality_on_company" ADD CONSTRAINT "speciality_on_company_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "speciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_on_company" ADD CONSTRAINT "services_on_company_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_on_company" ADD CONSTRAINT "services_on_company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "industry_on_company" ADD CONSTRAINT "industry_on_company_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "industry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "industry_on_company" ADD CONSTRAINT "industry_on_company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
