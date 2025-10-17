import { employeesData } from "@/Features/Payroll/consts/employees.const";
import { generatedSalariesData } from "@/Features/Payroll/consts/salary-generate.const";
import type { ITableState } from "@/Features/Payroll/types";
import type { ISalaryGenrateState } from "@/Features/Payroll/types/salary-generate.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";
import { toast } from "sonner";

const initialState: ISalaryGenrateState = {
  employees: employeesData,
  generatedSalaries: generatedSalariesData,
  tableState: {
    globalFilter: "",
    sorting: [{ desc: true, id: "generateDate" }],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  generateEditId: "",
  generateDeleteId: "",
};

export const salaryGenerateSlice = createSlice({
  name: "salaryGenerate",
  initialState,
  reducers: {
    generateSalary: (state, action) => {
      state.generatedSalaries = [...state.generatedSalaries, action.payload];
      toast.success("Salary generated succesfully");
      console.log(current(state));
    },
    selectGenerateEditId: (state, action) => {
      state.generateEditId = action.payload;
    },
    removeGenerateEditId: (state) => {
      state.generateEditId = "";
    },
    selectGenerateDeleteId: (state, action) => {
      state.generateDeleteId = action.payload;
    },
    removeGenerateDeleteId: (state) => {
      state.generateDeleteId = "";
    },
    editSalaryGenerate: (state, action) => {
      const index = state.generatedSalaries.findIndex(
        (c) => c._id === state.generateEditId
      );
      state.generatedSalaries[index] = {
        ...state.generatedSalaries[index],
        ...action.payload,
      };
      toast.success("Salary generate updated succesfully");
      state.generateEditId = "";
    },
    deleteSalaryGenerate: (state) => {
      state.generatedSalaries = state.generatedSalaries.filter(
        (salary) => salary._id !== state.generateDeleteId
      );
      toast.success("Salary generate deleted succesfully");
      state.generateDeleteId = "";
    },
    updateTableState: (
      state,
      action: PayloadAction<{
        key: keyof ITableState;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updater: Updater<any>;
      }>
    ) => {
      const { key, updater } = action.payload;

      const currentValue = state.tableState[key];
      const newValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      state.tableState[key] = newValue;
    },
  },
});

export const {
  generateSalary,
  selectGenerateEditId,
  removeGenerateEditId,
  selectGenerateDeleteId,
  removeGenerateDeleteId,
  editSalaryGenerate,
  deleteSalaryGenerate,
  updateTableState,
} = salaryGenerateSlice.actions;

export const selectSalaryGenerateData = (state: RootState) =>
  state.salaryGenerate;

export default salaryGenerateSlice.reducer;
