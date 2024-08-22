"use server";

import prisma from "@/lib/db";
import { SearchValidation } from "../validation";
import { Prisma } from "@prisma/client";

export const getCompanyTable = async (search: SearchValidation) => {
  const where: Prisma.companyWhereInput = {
    speciality_on_company:
      search.specialities.length !== 0
        ? {
            some: {
              speciality: {
                slug: {
                  in: search.specialities,
                },
              },
            },
          }
        : undefined,
    services_on_company:
      search.services.length !== 0
        ? {
            some: {
              service: {
                slug: {
                  in: search.services,
                },
              },
            },
          }
        : undefined,
    industry_on_company:
      search.services.length !== 0
        ? {
            some: {
              industry: {
                slug: {
                  in: search.industry,
                },
              },
            },
          }
        : undefined,
    city:
      search.city.length !== 0
        ? {
            slug: {
              in: search.city,
            },
          }
        : undefined,
    name: search.search
      ? {
          contains: search.search,
          mode: "insensitive",
        }
      : undefined,
  };

  const [count, data] = await prisma.$transaction([
    prisma.company.count({ where }),
    prisma.company.findMany({
      where,
      include: {
        city: true,
        speciality_on_company: {
          include: {
            speciality: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: search.limit ?? 10,
      skip: (search.limit ?? 10) * (search.page ?? 0),
    }),
  ]);

  return {
    count,
    data,
  };
};
