import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./theme/theme.jsx";
import { Suspense } from "react";
import { ApolloProvider } from "./server/apollo-client.jsx";
import { SettingsProvider } from "./theme/settings.jsx";
import { connect, Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store/index.js";
const root = createRoot(document.getElementById("root"));

root.render(
	<ReduxProvider store={store}>
		<ApolloProvider>
			<SettingsProvider>
				<ThemeProvider>
					<Suspense>
						<App />
					</Suspense>
				</ThemeProvider>
			</SettingsProvider>
		</ApolloProvider>
	</ReduxProvider>
);
