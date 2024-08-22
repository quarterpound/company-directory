import prisma from "@/lib/db";
import Filters from ".";
import { SearchValidation } from "../validation";

interface FiltersServerProps {
  filters: SearchValidation;
}

const FiltersServer = async ({ filters }: FiltersServerProps) => {
  const [cities, services, specialities, industries] =
    await prisma.$transaction([
      prisma.city.findMany(),
      prisma.service.findMany(),
      prisma.speciality.findMany(),
      prisma.industry.findMany(),
    ]);

  return (
    <Filters
      filters={filters}
      city={cities}
      service={services}
      specialty={specialities}
      industry={industries}
    />
  );
};

export default FiltersServer;
