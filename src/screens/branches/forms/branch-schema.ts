import { z } from "zod";

export const branchSchema = z.object({
    branch_name: z.string({required_error: 'Branch Name is required'}),
    branch_admin: z.string({required_error: 'Branch Admin is required'}),
    county_or_province: z.string({required_error: 'County is required'}),
    store: z.string({required_error: 'Store is required'}),
    address: z.string({required_error: 'Address required'}),
    description: z.string().optional(),
    sunday_opens: z.string(),
    sunday_closes: z.string(),
    monday_opens: z.string(),
    monday_closes: z.string(),
    tuesday_opens: z.string(),
    tuesday_closes: z.string(),
    wednesday_opens: z.string(),
    wednesday_closes: z.string(),
    thursday_opens: z.string(),
    thursday_closes: z.string(),
    friday_opens: z.string(),
    friday_closes: z.string(),
    saturday_opens: z.string(),
    saturday_closes: z.string(),
})