import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((error) => console.error("Failed to connect to MongoDB:", error));
};

export default connectDB;
