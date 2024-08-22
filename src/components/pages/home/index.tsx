import prisma from "@/lib/db";
import Filters from "./filters";
import FiltersServer from "./filters/server";
import TableServer from "./table/server";

const HomePage = async () => {
  return (
    <div className="py-24 container">
      <div className="grid gap-24">
        <div className="grid gap-4">
          <h1 className="text-foreground text-6xl font-extrabold text-center">
            Find your Company
          </h1>
          <h2 className="text-xl text-center text-muted-foreground">
            Jumpstart your app development process with pre-built solutions from
            Vercel and our community
          </h2>
        </div>
        <div className="grid grid-cols-[250px_auto] items-start py-5 w-full gap-12 mx-auto max-w-[1100px]">
          <div className="sticky top-0">
            <FiltersServer />
          </div>
          <div>
            <TableServer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
