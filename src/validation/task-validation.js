import { z } from "zod";

export const CREATE_TASK_VALIDATION = z.object({
	title: z.string().min(1, { message: "Title is Required" }),
	description: z.string(),
	dueDate: z.date().nullable(),
});
