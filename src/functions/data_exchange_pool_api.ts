import {
	app,
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export async function data_exchange_pool_api(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	context.log(`Http function processed request for url "${request.url}"`);

	const name = request.query.get("name") || (await request.text()) || "world";

	return { body: `Hello, ${name}!` };
}

app.http("data_exchange_pool_api", {
	methods: ["GET", "POST"],
	authLevel: "anonymous",
	handler: data_exchange_pool_api,
});
