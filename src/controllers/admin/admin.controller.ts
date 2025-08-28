import { HttpRequest, HttpResponseInit } from "@azure/functions";
import {
	getUserByIdService,
	createUserService,
} from "../../services/admin/admin.service";
import {
	createUserSchema,
	validateUserId,
} from "../../validations/admin/admin.validation";

export async function getUserController(
	req: HttpRequest
): Promise<HttpResponseInit> {
	const userId = req.params.id;

	const error = validateUserId(userId);
	if (error) {
		return { status: 400, body: error };
	}

	const user = await getUserByIdService(userId);

	if (!user) return { status: 404, body: "User not found" };

	return { status: 200, jsonBody: user };
}

export async function createUserController(
	req: HttpRequest
): Promise<HttpResponseInit> {
	try {
		const body = await req.json();

		// ✅ Validate input
		const parsed = createUserSchema.safeParse(body);
		if (!parsed.success) {
			return { status: 400, jsonBody: { error: parsed.error.issues } };
		}

		// ✅ Call service
		const user = await createUserService(parsed.data);

		return { status: 201, jsonBody: user };
	} catch (error: any) {
		console.error("Error creating user:", error);
		return { status: 500, jsonBody: { error: "Internal Server Error" } };
	}
}
