import prisma from "@/lib/db";
import Table from ".";

const TableServer = async () => {
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
    }),
  ]);

  return <Table companies={data} count={count} />;
};

export default TableServer;
