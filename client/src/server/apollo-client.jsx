import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider as TyraApolloProvider,
} from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
export const ApolloProvider = ({ children }) => {
	const client = new ApolloClient({
		uri: "http://localhost:5000/",
		cache: new InMemoryCache(),
	});
	if (process.env.NODE_ENV !== "production") {
		// Adds messages only in a dev environment
		loadDevMessages();
		loadErrorMessages();
	}
	return <TyraApolloProvider client={client}>{children}</TyraApolloProvider>;
};
