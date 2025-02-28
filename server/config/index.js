import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import typeDefs from "../graphql/typedef/typedefs.js";
import resolvers from "../graphql/resolvers/resolvers.js";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

const port = process.env.PORT;

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
