import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export async function test_get(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	context.log(`Http function processed request for url "${request.url}"`);

	const name =
		request.params?.name ||
		request.query.get("name") ||
		"world";

	return { body: `Hello, ${name}, Test Get` };
}


app.http("test_get", {
	methods: ["GET"],
	authLevel: "anonymous",
	route: "test_get/{name?}",
	handler: test_get,
});

export async function test_post(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	context.log(`Http function processed request for url "${request.url}"`);

	// const name = request.query.get("name") || (await request.text()) || "world";

	// return { body: `Hello, ${name}, Test Post` };

	let name: string | undefined;

	try {
		const body = (await request.json()) as { name?: string };
		name = body.name;
	} catch {
		// fallback if body is not JSON
		name = undefined;
	}

	name = request.query.get("name") || name || "world";

	return { body: `Hello, ${name}, Test Post` };
}

app.http("test_post", {
	methods: ["POST"],
	authLevel: "anonymous",
	handler: test_post,
});
