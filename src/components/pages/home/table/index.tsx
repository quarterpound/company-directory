"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { SearchValidation } from "../validation";
import { getCompanyTable } from "./actions";
import { useAppState } from "@/lib/state";
import Pagination from "./pagination";
import { useState } from "react";

type CompanyFull = Prisma.companyGetPayload<{
  include: {
    city: true;
    speciality_on_company: {
      include: {
        speciality: true;
      };
    };
  };
}>;

interface TableProps {
  initialCompanies: CompanyFull[];
  initialCount: number;
  filters: SearchValidation;
}

const Table = ({ initialCompanies, initialCount, filters }: TableProps) => {
  const { filters: internalFilters, setFilters } = useAppState();

  const query = useQuery({
    queryKey: [
      "companies",
      internalFilters ?? filters,
      (internalFilters ?? filters).page,
    ],
    queryFn: () =>
      getCompanyTable({
        ...(internalFilters ?? filters),
        page: (internalFilters ?? filters).page,
      }),
    initialData: () => {
      if (internalFilters) {
        return undefined;
      }

      return {
        count: initialCount,
        data: initialCompanies,
      };
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="grid gap-5">
      {query.data?.data.map((item) => (
        <Card className="shadow-xl" key={item.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{item.name}</span>
              <Link href={`/${item.slug}`}>
                <Button variant={"link"} size={"sm"}>
                  View
                </Button>
              </Link>
            </CardTitle>
            <CardDescription>{item.city.name}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex gap-1 flex-wrap">
              {item.speciality_on_company.map((item) => (
                <Badge
                  key={`${item.company_id}-${item.speciality_id}`}
                  variant={"outline"}
                >
                  {item.speciality.label}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
      {query.data?.count !== 0 && (
        <Pagination
          total={query.data?.count ?? 0}
          limit={10}
          page={(internalFilters ?? filters).page ?? 0}
          onChange={(page) =>
            setFilters({ ...(internalFilters ?? filters), page })
          }
        />
      )}
    </div>
  );
};

export default Table;
