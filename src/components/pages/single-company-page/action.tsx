"use server";

import prisma from "@/lib/db";
import { ClaimValidation } from "./validation";

export const getSingleCompany = async (slug: string) => {
  return await prisma.company.findUnique({
    where: {
      slug,
    },
    include: {
      industry_on_company: {
        include: {
          industry: true,
        },
      },
      services_on_company: {
        include: {
          service: true,
        },
      },
      speciality_on_company: {
        include: {
          speciality: true,
        },
      },
      city: true,
      claim: true,
    },
  });
};

export const submitClaim = async (id: number, claim: ClaimValidation) => {
  return prisma.claim.create({
    data: {
      company_id: id,
      first: claim.first,
      last: claim.last,
      email: claim.email,
      phone: claim.phone,
      message: claim.message,
    },
  });
};
