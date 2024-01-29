import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider as TyraApolloProvider,
} from "@apollo/client";

export const ApolloProvider = ({ children }) => {
	const client = new ApolloClient({
		uri: "http://localhost:5000/",
		cache: new InMemoryCache(),
	});
	return <TyraApolloProvider client={client}>{children}</TyraApolloProvider>;
};
