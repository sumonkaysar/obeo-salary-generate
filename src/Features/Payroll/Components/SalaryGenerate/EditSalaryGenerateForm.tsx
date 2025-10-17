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
  editSalaryGenerate,
  removeGenerateEditId,
  selectSalaryGenerateData,
} from "@/Features/Payroll/payrollSlices/SalaryGenerate.slice";
import type { IGeneratedSalary } from "@/Features/Payroll/types/salary-generate.type";
import { salaryGenerateUpdateZodSchema } from "@/Features/Payroll/validations/salary-generate.validation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";

const EditSalaryGenerateForm = () => {
  const { generatedSalaries, generateEditId } = useAppSelector(
    selectSalaryGenerateData
  );
  const dispatch = useAppDispatch();
  const prevData = generatedSalaries.find((s) => s._id === generateEditId);
  const form = useForm({
    resolver: zodResolver(salaryGenerateUpdateZodSchema),
    values: {
      name: prevData?.name || "",
      startDate: prevData?.startDate as unknown as Date,
      endDate: prevData?.endDate as unknown as Date,
      generateBy: prevData?.generateBy || "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof salaryGenerateUpdateZodSchema>
  ) => {
    try {
      let updatedData = {} as Partial<IGeneratedSalary>;

      for (const key in data) {
        if (key === "startDate" || key === "endDate") {
          updatedData = {
            ...updatedData,
            [key]: new Date(
              data[key as keyof typeof data] as string
            ).toISOString(),
          };
        } else {
          updatedData = {
            ...updatedData,
            [key]: data[key as keyof typeof data],
          };
        }
      }

      dispatch(editSalaryGenerate(updatedData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={!!generateEditId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          dispatch(removeGenerateEditId());
        }
      }}
    >
      <DialogContent
        className="p-0 overflow-hidden min-w-11/12"
        aria-describedby="Edit Salary Generate"
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="text-xl">Edit Salary Generate</DialogTitle>
          <DialogDescription>
            Here you will Edit Salary Generate
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="border">
            <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
              Edit Salary Generate
            </h2>
            <Form {...form}>
              <form
                id="editSalaryGenerate"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 px-6 py-4"
              >
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="editSalaryGenerate">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSalaryGenerateForm;
