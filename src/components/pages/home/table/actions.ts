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
      take: search.limit,
      skip: search.limit * search.page,
    }),
  ]);

  return {
    count,
    data,
  };
};
