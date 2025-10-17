import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  generateSalary,
  selectSalaryGenerateData,
} from "@/Features/Recruitment/recruitmentSlices/SalaryGenerate.slice";
import { salaryGenerateZodSchema } from "@/Features/Recruitment/validations/salary-generate.validation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const SalarayGenerateForm = () => {
  const { employees } = useAppSelector(selectSalaryGenerateData);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(salaryGenerateZodSchema),
    defaultValues: {
      employee: "",
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      generateBy: "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof salaryGenerateZodSchema>
  ) => {
    try {
      const selectedEmployee = employees.find(
        (employee) => employee._id === data.employee
      );
      const generateData = {
        _id: Number(
          `${
            Math.floor(Math.random() * (10000000 - 99999999 + 1)) + 99999999
          }${new Date().getTime()}`
        )
          .toString(16)
          .padStart(17, "0"),
        firstName: selectedEmployee?.firstName,
        lastName: selectedEmployee?.lastName,
        employeeId: selectedEmployee?.employeeId,
        name: data.name,
        generateDate: new Date().toISOString(),
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        generateBy: data.generateBy,
      };

      dispatch(generateSalary(generateData));
      if (closeBtnRef.current) {
        closeBtnRef.current.click();
      }
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Generate Now
          </Button>
        </DialogTrigger>
        <DialogContent
          className="p-0 overflow-hidden min-w-11/12"
          aria-describedby="salaryGenerate"
        >
          <DialogHeader className="sr-only">
            <DialogTitle className="text-xl">Generate Now</DialogTitle>
            <DialogDescription>Here you will generate salary</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="border">
              <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
                Generate Salary
              </h2>
              <Form {...form}>
                <form
                  id="generateSalary"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6 px-6 py-4"
                >
                  <FormField
                    control={form.control}
                    name="employee"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Employee<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem
                                key={employee._id}
                                value={employee._id}
                              >
                                {employee.firstName} {employee.lastName} (
                                {employee.employeeId})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          Select an employee
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Name.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Start Date <span className="text-red-500">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                field.onChange(date);
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="sr-only">
                          Pick start date.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          End Date <span className="text-red-500">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                field.onChange(date);
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="sr-only">
                          Pick end date.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="generateBy"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Generate By <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Generate By" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter Generate By.
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <DialogFooter className="p-4">
            <DialogClose asChild>
              <Button type="button" ref={closeBtnRef} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="generateSalary">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SalarayGenerateForm;
