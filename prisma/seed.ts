import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { slugify } from "transliteration";

const prisma = new PrismaClient();

const generateCompany = () => {
  const name = faker.company.name();
  const location = faker.location?.cityName();

  const services = Array.from({
    length: faker.datatype.number({ min: 2, max: 5 }),
  }).map(() => faker.company.buzzVerb());

  const specialities = Array.from({
    length: faker.datatype.number({ min: 2, max: 5 }),
  }).map(() => faker.company.buzzNoun());

  const industries = Array.from({
    length: faker.datatype.number({ min: 2, max: 5 }),
  }).map(() => faker.commerce.department());

  return {
    name,
    location,
    services,
    specialities,
    industries,
  };
};

const main = async () => {
  await prisma.$connect();

  const companies = Array.from({
    length: 25000,
  }).map(() => generateCompany());

  for (const company of companies) {
    const dbServices = await prisma.$transaction(
      company.services.map((item) =>
        prisma.service.upsert({
          where: {
            slug: slugify(item),
          },
          update: {},
          create: {
            slug: slugify(item),
            label: item,
          },
        }),
      ),
    );

    const dbIndustries = await prisma.$transaction(
      company.industries.map((item) =>
        prisma.industry.upsert({
          where: {
            slug: slugify(item),
          },
          update: {},
          create: {
            slug: slugify(item),
            label: item,
          },
        }),
      ),
    );

    const speciality = await prisma.$transaction(
      company.specialities.map((item) =>
        prisma.speciality.upsert({
          where: {
            slug: slugify(item),
          },
          update: {},
          create: {
            slug: slugify(item),
            label: item,
          },
        }),
      ),
    );

    try {
      const createdCompany = await prisma.company.create({
        data: {
          name: company.name,
          slug: slugify(company.name),
          city: {
            connectOrCreate: {
              where: {
                slug: slugify(company.location),
              },
              create: {
                name: company.location,
                slug: slugify(company.location),
              },
            },
          },
          services_on_company: {
            createMany: {
              data: dbServices.map((item) => ({
                service_id: item.id,
              })),
            },
          },
          industry_on_company: {
            createMany: {
              data: dbIndustries.map((item) => ({
                industry_id: item.id,
              })),
            },
          },
          speciality_on_company: {
            createMany: {
              data: speciality.map((item) => ({
                speciality_id: item.id,
              })),
            },
          },
        },
      });
      console.log(createdCompany);
    } catch (e) {
      continue;
    }

    await prisma.$disconnect();
  }
};

main();
