import TableActions from "@/Features/Recruitment/Components/SalaryGenerate/TableActions";
import TableColumnHeader from "@/Features/Recruitment/Components/SalaryGenerate/TableColumnHeader";
import type { IGeneratedSalary } from "@/Features/Recruitment/types/salary-generate.type";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const tableColumns: ColumnDef<IGeneratedSalary>[] = [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "employeeName",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Employee Name" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Employee Id" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("employeeId")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Name" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "generateDate",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Generate Date" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {format(row.getValue("generateDate"), "do MMM yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Start Date" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {format(row.getValue("startDate"), "do MMM yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="End Date" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {format(row.getValue("endDate"), "do MMM yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "generateBy",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Generate By" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("generateBy")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { _id } = row.original;
      return <TableActions id={_id} />;
    },
  },
];
