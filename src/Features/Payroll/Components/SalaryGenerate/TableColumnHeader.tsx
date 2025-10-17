import { Button } from "@/components/ui/button";
import type { IGeneratedSalary } from "@/Features/Payroll/types/salary-generate.type";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";
import { ArrowDownAZ, ArrowUpDown, ArrowUpZA } from "lucide-react";

const TableColumnHeader = ({
  column,
  columnName,
}: {
  column: Column<IGeneratedSalary, unknown>;
  columnName: string;
}) => {
  const isSorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      {columnName}
      <ArrowDownAZ
        className={cn(isSorted === "asc" ? "inline-flex" : "hidden")}
      />
      <ArrowUpZA
        className={cn(isSorted === "desc" ? "inline-flex" : "hidden")}
      />
      <ArrowUpDown className={cn(!isSorted ? "inline-flex" : "hidden")} />
    </Button>
  );
};

export default TableColumnHeader;
