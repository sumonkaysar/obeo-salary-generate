import z from "zod";

export const salaryGenerateZodSchema = z.object({
  employee: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Employee is required"
          : "Employee must be a string",
    })
    .nonempty("Employee can't be blank"),
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Name is required"
          : "Name must be a string",
    })
    .nonempty("Name can't be blank"),
  startDate: z.date({
    error: (issue) =>
      issue.input === undefined
        ? "Start date is required"
        : "Start date must be a date",
  }),
  endDate: z.date({
    error: (issue) =>
      issue.input === undefined
        ? "End date is required"
        : "End date must be a date",
  }),
  generateBy: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Generate is required"
          : "Generate must be a string",
    })
    .nonempty("Generate can't be blank"),
});

export const salaryGenerateUpdateZodSchema = z.object({
  name: z
    .string("Name must be a string")
    .nonempty("Name can't be blank")
    .optional(),
  startDate: z.date("Start date must be a date").optional(),
  endDate: z.date("End date must be a date").optional(),
  generateBy: z
    .string("Generate must be a string")
    .nonempty("Generate can't be blank")
    .optional(),
});
