import { pool } from "../../utils/postgres/pool";
import { CreateUserInput } from "../../validations/admin/admin.validation";

export async function getUserByIdService(id: string) {
	const result = await pool.query(
		"SELECT id, name, email, created_at FROM public.mock_users WHERE id = $1",
		[id]
	);
	return result.rows[0];
}

export async function createUserService(data: CreateUserInput) {
	const insertQuery = `
    INSERT INTO public.users 
        (email, password, name, lastname, token, main_company_id, main_team_id, global_role_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;

	const values = [
		data.email,
		data.password,      // TODO: hash password with bcrypt
		data.name,
		data.lastname,
		data.token,         // TODO: replace with real token generator
		data.company_id,
		data.team_id,
		data.role_id,
	];

	const result = await pool.query(insertQuery, values);
	return result.rows[0];
}
