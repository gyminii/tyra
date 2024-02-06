import { z } from "zod";

export const CREATE_BOARD_VALIDATION = z.object({
	title: z.string().min(1, { message: "Title is Required" }),
});
