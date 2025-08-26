export function validateUserId(id: string | null): string | null {
	if (!id) return "ID is required";
	if (!/^\d+$/.test(id)) return "ID must be a number";
	return null;
}
