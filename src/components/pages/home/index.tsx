import { notFound } from "next/navigation";
import FiltersServer from "./filters/server";
import TableServer from "./table/server";
import { searchValidation, SearchValidation } from "./validation";

interface HomePageProps {
  filters: SearchValidation;
}

const HomePage = async ({ filters }: HomePageProps) => {
  const parsed = searchValidation.safeParse(filters);

  if (!parsed.success) {
    notFound();
  }

  return (
    <div className="py-12 md:py-24 container">
      <div className="grid gap-6 md:gap-24">
        <div className="grid gap-4">
          <h1 className="text-foreground text-4xl md:text-6xl font-extrabold text-center">
            Find your Company
          </h1>
          <h2 className="md:text-xl text-lg text-center text-muted-foreground">
            Jumpstart your app development process with pre-built solutions from
            Vercel and our community
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[250px_auto] items-start py-5 w-full gap-12 mx-auto max-w-[1100px]">
          <div className="md:sticky md:top-0">
            <FiltersServer filters={parsed.data} />
          </div>
          <div>
            <TableServer filters={parsed.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
