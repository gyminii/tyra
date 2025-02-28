import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider as TyraApolloProvider,
} from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
export const ApolloProvider = ({ children }) => {
	const graphqlUri =
		process.env.NODE_ENV === "production"
			? "https://tyra-server.up.railway.app/" // Production URI
			: "http://localhost:5000/";
	const client = new ApolloClient({
		uri: graphqlUri,
		cache: new InMemoryCache(),
	});
	if (process.env.NODE_ENV !== "production") {
		// Adds messages only in a dev environment

		loadDevMessages();
		loadErrorMessages();
	}
	return <TyraApolloProvider client={client}>{children}</TyraApolloProvider>;
};
