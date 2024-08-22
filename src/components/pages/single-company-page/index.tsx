"use client";

import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getSingleCompany } from "./action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const ClaimForm = dynamic(() => import("./form"), {
  ssr: false,
  loading: () => <Skeleton className="h-9 w-24" />,
});

type FullCompany = Prisma.companyGetPayload<{
  include: {
    industry_on_company: {
      include: {
        industry: true;
      };
    };
    services_on_company: {
      include: {
        service: true;
      };
    };
    speciality_on_company: {
      include: {
        speciality: true;
      };
    };
    city: true;
    claim: true;
  };
}>;

interface SingleCompanyPageProps {
  data: FullCompany;
}

const SingleCompanyPage = ({ data }: SingleCompanyPageProps) => {
  const query = useQuery({
    queryKey: ["company", data.slug],
    queryFn: async () => {
      const res = await getSingleCompany(data.slug);
      if (!res) {
        throw new Error("something went wrong");
      }
      return res!;
    },
    initialData: data,
  });

  return (
    <div className="container grid gap-8 py-24">
      <Link href={"/"} className="w-fit">
        <Button variant={"outline"} className="w-fit flex gap-2 items-center">
          <ArrowLeftIcon />
          <span>Back to companies</span>
        </Button>
      </Link>
      <Card className="shadow-xl max-w-[600px] w-full">
        <CardHeader>
          <CardTitle>{query.data.name}</CardTitle>
          <CardDescription>{query.data.city.name}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">Overview</p>
            <p>aveho aranea amet crebro culpa</p>
          </div>
          <hr />
          <div className="grid gap-2">
            <p className="text-sm text-muted-foreground">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {query.data.speciality_on_company.map((item) => (
                <Badge
                  variant={"outline"}
                  key={`${item.company_id}-${item.speciality_id}`}
                >
                  {item.speciality.label}
                </Badge>
              ))}
            </div>
          </div>
          <hr />
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">Industries</p>
            <ul className="grid divide-y">
              {query.data.industry_on_company.map((item) => (
                <li
                  className="py-2 text-sm"
                  key={`${item.company_id}-${item.industry_id}`}
                >
                  {item.industry.label}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {query.isFetching ? (
            <Skeleton className="h-9 w-24" />
          ) : (
            <ClaimForm data={query.data} />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleCompanyPage;
