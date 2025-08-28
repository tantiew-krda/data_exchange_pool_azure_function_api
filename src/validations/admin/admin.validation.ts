// validations/admin/admin.validation.ts
import { z } from "zod";

export function validateUserId(id: string | null): string | null {
	if (!id) return "ID is required";
	if (!/^\d+$/.test(id)) return "ID must be a number";
	return null;
}

export const createUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().min(1),
	lastname: z.string().min(1),

    // token: z.hash("sha256", { enc: "base64" }),
    token: z.string(),

	company_id: z.string().uuid(),
	team_id: z.string().uuid(),
	role_id: z.string().uuid(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
