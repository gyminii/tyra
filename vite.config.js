import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		commonjsOptions: { exclude: ["shared-project"], include: [] }, // <----
		// commonjsOptions: { include: [] },                                          // Edit:
	},
});
