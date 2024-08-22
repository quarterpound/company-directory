-- AlterTable
CREATE SEQUENCE claim_id_seq;
ALTER TABLE "claim" ALTER COLUMN "id" SET DEFAULT nextval('claim_id_seq');
ALTER SEQUENCE claim_id_seq OWNED BY "claim"."id";

-- AlterTable
CREATE SEQUENCE industry_id_seq;
ALTER TABLE "industry" ALTER COLUMN "id" SET DEFAULT nextval('industry_id_seq');
ALTER SEQUENCE industry_id_seq OWNED BY "industry"."id";

-- AlterTable
CREATE SEQUENCE service_id_seq;
ALTER TABLE "service" ALTER COLUMN "id" SET DEFAULT nextval('service_id_seq');
ALTER SEQUENCE service_id_seq OWNED BY "service"."id";

-- AlterTable
CREATE SEQUENCE speciality_id_seq;
ALTER TABLE "speciality" ALTER COLUMN "id" SET DEFAULT nextval('speciality_id_seq');
ALTER SEQUENCE speciality_id_seq OWNED BY "speciality"."id";
