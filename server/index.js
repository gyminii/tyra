import { ApolloServer } from "@apollo/server";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typedefs.js";
import resolvers from "./resolvers.js";

// [type, type1, type2]
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
