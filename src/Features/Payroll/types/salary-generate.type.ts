import type { ITableState } from "@/Features/Payroll/types";
import type { IEmployee } from "@/Features/Payroll/types/employee.type";

export interface IGeneratedSalary {
  _id: string;
  employee: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  name: string;
  generateDate: string;
  startDate: string;
  endDate: string;
  generateBy: string;
}

export interface ISalaryGenrateState {
  employees: IEmployee[];
  generatedSalaries: IGeneratedSalary[];
  tableState: ITableState;
  generateEditId: string;
  generateDeleteId: string;
}
