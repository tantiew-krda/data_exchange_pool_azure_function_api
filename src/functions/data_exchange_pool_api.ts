// import {
// 	app,
// 	HttpRequest,
// 	HttpResponseInit,
// 	InvocationContext,
// } from "@azure/functions";
// import { Client } from "pg";

// export async function test_get(
// 	request: HttpRequest,
// 	context: InvocationContext
// ): Promise<HttpResponseInit> {
// 	context.log(`Http function processed request for url "${request.url}"`);

// 	const name = request.params?.name || request.query.get("name") || "world";

// 	return { body: `Hello, ${name}, Test Get` };
// }

// app.http("test_get", {
// 	methods: ["GET"],
// 	authLevel: "anonymous",
// 	route: "test_get/{name?}",
// 	handler: test_get,
// });

// export async function test_post(
// 	request: HttpRequest,
// 	context: InvocationContext
// ): Promise<HttpResponseInit> {
// 	context.log(`Http function processed request for url "${request.url}"`);

// 	// const name = request.query.get("name") || (await request.text()) || "world";

// 	// return { body: `Hello, ${name}, Test Post` };

// 	let name: string | undefined;

// 	try {
// 		const body = (await request.json()) as { name?: string };
// 		name = body.name;
// 	} catch {
// 		// fallback if body is not JSON
// 		name = undefined;
// 	}

// 	name = request.query.get("name") || name || "world";

// 	return { body: `Hello, ${name}, Test Post` };
// }

// app.http("test_post", {
// 	methods: ["POST"],
// 	authLevel: "anonymous",
// 	handler: test_post,
// });

// // Singleton pattern to reuse DB client across function executions (if warm)
// let client: Client | null = null;
// let isConnected = false;

// async function getClient() {
// 	if (!client) {
// 		const host = process.env.DATA_EXCHANGE_POOL_POSTGRES_HOST;
// 		const database = process.env.DATA_EXCHANGE_POOL_POSTGRES_DATABASE_NAME;
// 		const user = process.env.DATA_EXCHANGE_POOL_POSTGRES_USER;
// 		const password = process.env.DATA_EXCHANGE_POOL_POSTGRES_PASSWORD;

// 		const connectionString = `postgresql://${user}:${password}@${host}:5432/${database}`;

// 		// client = new Client({ connectionString });
// 		client = new Client({
// 			connectionString,
// 			ssl: {
// 				rejectUnauthorized: false,
// 			},
// 		});
// 	}

// 	if (!isConnected) {
// 		await client.connect();
// 		isConnected = true;
// 	}

// 	return client;
// }

// export async function test_pg(
// 	request: HttpRequest,
// 	context: InvocationContext
// ): Promise<HttpResponseInit> {
// 	context.log(`Http function processed request for url "${request.url}"`);

// 	try {
// 		const client = await getClient();
// 		const result = await client.query(
// 			// "SELECT id, name, email, created_at FROM mock_users"
// 			"SELECT id, name, email, created_at FROM public.mock_users"
// 		);

// 		return {
// 			status: 200,
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({
// 				message: "✅ Fetched users from database",
// 				data: result.rows,
// 			}),
// 		};
// 	} catch (err) {
// 		// context.log.error("❌ Database query failed:", err);
// 		console.error("❌ Database query failed:", err);
// 		return {
// 			status: 500,
// 			body: "Internal server error while fetching users.",
// 		};
// 	}
// }

// app.http("test_pg", {
// 	methods: ["GET"],
// 	authLevel: "anonymous",
// 	route: "test_pg",
// 	handler: test_pg,
// });
