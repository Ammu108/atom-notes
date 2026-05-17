export const normalizeString = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[_\s]+/g, "") // remove spaces & underscores
		.replace(/[^a-z0-9]/g, ""); // remove special characters
};
