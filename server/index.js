import { ApolloServer } from "@apollo/server";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typedefs.js";

dotenv.config();

const port = process.env.PORT || 5000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

connectDB()
	.then(async () => {
		console.log("MONGODB CONNECTED");
		return await startStandaloneServer(server, {
			listen: { port: port },
		});
	})
	.then((res) => console.log(`Server ready at: ${res.url} 🚀`));
