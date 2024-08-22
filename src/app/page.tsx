import HomePage from "@/components/pages/home";
import { searchValidation } from "@/components/pages/home/validation";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
    services: string | string[] | undefined;
    specialities: string | string[] | undefined;
    city: string | string[] | undefined;
    industry: string | string[] | undefined;
    page: string | undefined;
    limit: string | undefined;
  };
}) {
  const parsed = searchValidation.safeParse({
    ...searchParams,
    services: Array.isArray(searchParams.services)
      ? searchParams.services
      : searchParams.services
        ? [searchParams.services]
        : [],
    specialities: Array.isArray(searchParams.specialities)
      ? searchParams.specialities
      : searchParams.specialities
        ? [searchParams.specialities]
        : [],
    city: Array.isArray(searchParams.city)
      ? searchParams.city
      : searchParams.city
        ? [searchParams.city]
        : [],
    industry: Array.isArray(searchParams.industry)
      ? searchParams.industry
      : searchParams.industry
        ? [searchParams.industry]
        : [],
    limit: searchParams.limit,
    page: searchParams.page,
  });

  if (!parsed.success) {
    notFound();
  }

  return <HomePage filters={parsed.data} />;
}
