import { Button } from "@/components/ui/button";
import SalaryGenerateForm from "@/Features/Payroll/Components/SalaryGenerate/SalaryGenerateForm";
import SalaryGenerateTable from "@/Features/Payroll/Components/SalaryGenerate/SalaryGenerateTable";

const SalaryGenerate = () => {
  return (
    <div className="px-3 py-2 bg-[#F4F4F5] min-h-screen">
      <div className="bg-white shadow-md rounded-xs mx-auto border">
        <div className="flex justify-between items-center border-b py-3 px-4">
          <h2 className="text-xl font-semibold">Salary Generate</h2>
          <div className="flex items-center gap-3">
            <SalaryGenerateForm />
            <Button>Manage Salary Generate</Button>
          </div>
        </div>
        <div className="px-4 py-3">
          <SalaryGenerateTable />
        </div>
      </div>
    </div>
  );
};

export default SalaryGenerate;
