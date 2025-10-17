import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDeleteDialog from "@/Features/Recruitment/Components/SalaryGenerate/ConfirmDeleteDialog";
import EditSalaryGenerateForm from "@/Features/Recruitment/Components/SalaryGenerate/EditSalaryGenerateForm";
import SearchData from "@/Features/Recruitment/Components/SalaryGenerate/SearchData";
import ShowEntries from "@/Features/Recruitment/Components/SalaryGenerate/ShowEntries";
import { tableColumns } from "@/Features/Recruitment/Components/SalaryGenerate/TableColumns";
import TablePagination from "@/Features/Recruitment/Components/SalaryGenerate/TablePagination";
import {
  deleteSalaryGenerate,
  removeGenerateDeleteId,
  selectSalaryGenerateData,
  updateTableState,
} from "@/Features/Recruitment/recruitmentSlices/SalaryGenerate.slice";
import type { IGeneratedSalary } from "@/Features/Recruitment/types/salary-generate.type";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableState,
} from "@tanstack/react-table";

const SalaryGenerateTable = () => {
  const { generatedSalaries, tableState, generateDeleteId } = useAppSelector(
    selectSalaryGenerateData
  );
  const dispatch = useAppDispatch();

  const table = useReactTable<IGeneratedSalary>({
    data: generatedSalaries,
    columns: tableColumns,
    onSortingChange: (updater) =>
      dispatch(updateTableState({ key: "sorting", updater })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) =>
      dispatch(updateTableState({ key: "rowSelection", updater })),
    onPaginationChange: (updater) =>
      dispatch(updateTableState({ key: "pagination", updater })),
    onGlobalFilterChange: (updater) =>
      dispatch(updateTableState({ key: "globalFilter", updater })),
    state: tableState as unknown as Partial<TableState>,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <ShowEntries table={table} />
        <SearchData table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-10 text-center bg-[#F4F4F5]"
                >
                  No results found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
      <ConfirmDeleteDialog
        open={!!generateDeleteId}
        onOpenChange={(open: boolean) => {
          if (!open) {
            dispatch(removeGenerateDeleteId());
          }
        }}
        onConfirm={() => dispatch(deleteSalaryGenerate())}
      />
      <EditSalaryGenerateForm />
    </div>
  );
};

export default SalaryGenerateTable;
