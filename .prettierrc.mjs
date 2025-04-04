import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

/** @type {import("prettier").Config} */
export default {
	plugins: [
		require.resolve("prettier-plugin-astro"),
		require.resolve("prettier-plugin-organize-imports"),
	],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
	useTabs: true,
	tabWidth: 2,
	semi: true,
	singleQuote: false,
	trailingComma: "all",
	printWidth: 80,
	endOfLine: "crlf",
};
