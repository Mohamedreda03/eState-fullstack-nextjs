import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB:", error));
};

export default connectDB;
