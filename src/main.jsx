import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./theme/theme.jsx";
import { Suspense } from "react";
import { ApolloProvider } from "./server/apollo-client.jsx";
import { SettingsProvider } from "./theme/settings.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
	<ApolloProvider>
		<SettingsProvider>
			<ThemeProvider>
				<Suspense>
					<App />
				</Suspense>
			</ThemeProvider>
		</SettingsProvider>
	</ApolloProvider>
);
