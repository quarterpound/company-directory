import { Button } from "@/components/ui/button";

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  loading?: boolean;
  onChange: (page: number, limit: number) => void;
}

const Pagination = ({
  total,
  limit,
  page,
  onChange,
  loading,
}: PaginationProps) => {
  const lastPage = Math.ceil(total / limit);

  return (
    <div className="flex items-center justify-between">
      <Button
        variant={"outline"}
        size={"sm"}
        className="min-w-[80px]"
        disabled={page === 0 || loading}
        onClick={() => onChange(page - 1, limit)}
      >
        Previous
      </Button>
      <div className="flex items-center">
        <p className="text-sm">{`Page ${page + 1} of ${lastPage}`}</p>
      </div>
      <Button
        className="min-w-[80px]"
        variant={"outline"}
        size={"sm"}
        disabled={page === lastPage - 1 || loading}
        onClick={() => onChange(page + 1, limit)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
