import prisma from "@/lib/db";
import Filters from ".";

const FiltersServer = async () => {
  const [cities, services, specialities, industries] =
    await prisma.$transaction([
      prisma.city.findMany(),
      prisma.service.findMany(),
      prisma.speciality.findMany(),
      prisma.industry.findMany(),
    ]);

  return (
    <Filters
      city={cities}
      service={services}
      specialty={specialities}
      industry={industries}
    />
  );
};

export default FiltersServer;
