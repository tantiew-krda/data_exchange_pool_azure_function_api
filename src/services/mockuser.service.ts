import { pool } from "../utils/postgres/pool";
// import { getClient } from "../utils/postgres/client";

export async function getUserByIdService(id: string) {
	// const result = await pool.query("SELECT * FROM mock_users WHERE id = $1", [id]);
	const result = await pool.query("SELECT id, name, email, created_at FROM public.mock_users WHERE id = $1", [id]);
	return result.rows[0];
}
