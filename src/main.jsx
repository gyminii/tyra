import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./theme/theme.jsx";
import { Suspense } from "react";
import { ApolloProvider } from "./server/apollo-client.jsx";
import { SettingsProvider } from "./theme/settings.jsx";
import { Toaster } from "react-hot-toast";
const root = createRoot(document.getElementById("root"));

root.render(
	<ApolloProvider>
		<SettingsProvider>
			<ThemeProvider>
				<Suspense>
					<Toaster />
					<App />
				</Suspense>
			</ThemeProvider>
		</SettingsProvider>
	</ApolloProvider>
);
