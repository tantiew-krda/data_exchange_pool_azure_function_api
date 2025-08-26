import { Pool } from "pg";

export const pool = new Pool({
	host: process.env.DATA_EXCHANGE_POOL_POSTGRES_HOST,
	database: process.env.DATA_EXCHANGE_POOL_POSTGRES_DATABASE_NAME,
	user: process.env.DATA_EXCHANGE_POOL_POSTGRES_USER,
	password: process.env.DATA_EXCHANGE_POOL_POSTGRES_PASSWORD,
	port: 5432, // or your custom port
	ssl: {
		rejectUnauthorized: false,
	},
	max: 10, // max number of clients in the pool
	idleTimeoutMillis: 30000, // close idle clients after 30s
});
