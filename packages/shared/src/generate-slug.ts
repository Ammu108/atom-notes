export const generateSlug = (text: string): string => {
	if (!text) return "";

	return text
		.toLowerCase()
		.normalize("NFC") // Standardises special accents
		.replace(/[^a-z0-9\s-]/g, "") // Removes symbols except letters, numbers, spaces, and dashes
		.trim() // Removes spaces from start and end
		.replace(/[\s_]+/g, "-") // Replaces spaces and underscores with a single dash
		.replace(/-+/g, "-"); // Collapses consecutive dashes (e.g., "---" becomes "-")
};
