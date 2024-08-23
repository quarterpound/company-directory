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
import { useDebounce } from "@uidotdev/usehooks";
import { PackageX } from "lucide-react";
import { pushParams } from "@/lib/utils";

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

  const { search, ...finalFilters } = internalFilters ?? filters;
  const finalSearch = useDebounce(search, 300);

  const query = useQuery({
    queryKey: ["companies", finalFilters, finalSearch],
    queryFn: () =>
      getCompanyTable({
        ...finalFilters,
        search: finalSearch,
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
      {query.data?.count === 0 && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex flex-col items-center justify-center text-center">
              <PackageX className="h-12 w-12 text-muted-foreground mb-2" />
              <span>No items found</span>
            </CardTitle>
            <CardDescription className="text-center">
              Try adjusting your filters or search criteria
            </CardDescription>
          </CardHeader>
        </Card>
      )}
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
          onChange={(page) => {
            const data = { ...(internalFilters ?? filters), page };
            setFilters(data);
            pushParams(data);
          }}
        />
      )}
    </div>
  );
};

export default Table;
