import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { getUserByIdService } from "../services/mockuser.service";
import { validateUserId } from "../validations/mockuser.validation";

export async function getUserController(
	req: HttpRequest
): Promise<HttpResponseInit> {
	// const userId = req.query.get("id");
	const userId = req.params.id;

	const error = validateUserId(userId);
	if (error) {
		return { status: 400, body: error };
	}

	const user = await getUserByIdService(userId);
	// console.log("user", user);

	if (!user) return { status: 404, body: "User not found" };

	return { status: 200, jsonBody: user };
}
