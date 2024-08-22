import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Link from "next/link";

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
  companies: CompanyFull[];
  count: number;
}

const Table = ({ companies, count }: TableProps) => {
  return (
    <div className="grid gap-5">
      {companies.map((item) => (
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
    </div>
  );
};

export default Table;
