"use server";

import prisma from "@/lib/db";
import { SearchValidation } from "../validation";

export const getCompanyTable = async (search: SearchValidation) => {
  const [count, data] = await prisma.$transaction([
    prisma.company.count(),
    prisma.company.findMany({
      include: {
        city: true,
        speciality_on_company: {
          include: {
            speciality: true,
          },
        },
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
