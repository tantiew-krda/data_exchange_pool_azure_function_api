import { Client } from "pg";

let client: Client | null = null;
let isConnected = false;

export async function getClient(): Promise<Client> {
	if (!client) {
		const host = process.env.DATA_EXCHANGE_POOL_POSTGRES_HOST;
		const database = process.env.DATA_EXCHANGE_POOL_POSTGRES_DATABASE_NAME;
		const user = process.env.DATA_EXCHANGE_POOL_POSTGRES_USER;
		const password = process.env.DATA_EXCHANGE_POOL_POSTGRES_PASSWORD;

		const connectionString = `postgresql://${user}:${password}@${host}:5432/${database}`;

		client = new Client({
			connectionString,
			ssl: {
				rejectUnauthorized: false,
			},
		});
	}

	if (!isConnected) {
		await client.connect();
		isConnected = true;
	}

	return client;
}
