import mongoose from "mongoose";

export const connectDB = async () => {
	console.log("CALLING API", process.env.MONGO_URI);
	return await mongoose.connect(process.env.MONGO_URI);
};
