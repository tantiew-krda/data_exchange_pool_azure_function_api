// lib/token/genToken.ts


// import * as crypto from "crypto";

// const alphabet =
// 	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

// export function generateSecureToken(length: number = 15): string {
// 	const bytes = crypto.randomBytes(length);
// 	let token = "";

// 	for (let i = 0; i < length; i++) {
// 		token += alphabet[bytes[i] % alphabet.length];
// 	}

// 	return token;
// }


import { v4 as uuidv4, parse as uuidParse } from "uuid";

/**
 * Converts UUIDv4 string to a Base64-encoded string (URL-safe version).
 */
function uuidToBase64(uuid: string): string {
	const bytes = uuidParse(uuid); // Uint8Array(16)
	const b64 = Buffer.from(bytes).toString("base64");
	// Optional: make it URL-safe
	return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}


// Usage:
const uuid = uuidv4(); // e.g. 'b38b416a-2d32-4c9b-b2c6-5d60a8b90bb9'

const tokenBase64 = uuidToBase64(uuid); // e.g. 's4tBak8yTJsSxrXWCouQuw'

console.log({ uuid, tokenBase64 });







// CREATE TABLE users (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   username TEXT UNIQUE NOT NULL CHECK (username ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
//   password TEXT NOT NULL,
//   name TEXT NOT NULL,
//   lastname TEXT NOT NULL,
//   company_id UUID NOT NULL,
//   team_id UUID NOT NULL,
//   token TEXT UNIQUE, -- optional, can be generated after login or registration
//   created_at TIMESTAMP DEFAULT now(),
//   updated_at TIMESTAMP DEFAULT now()
// );