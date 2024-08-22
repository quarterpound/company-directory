import Table from ".";
import { getCompanyTable } from "./actions";
import { SearchValidation } from "../validation";

interface TableServerProps {
  filters: SearchValidation;
}

const TableServer = async ({ filters }: TableServerProps) => {
  const { count, data } = await getCompanyTable(filters);

  return (
    <Table initialCompanies={data} initialCount={count} filters={filters} />
  );
};

export default TableServer;
