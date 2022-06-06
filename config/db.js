import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const url =
//   "mongodb+srv://prince26:prince@123@ecommerce.1s9cl.mongodb.net/Hotel_DB?retryWrites=true&w=majority";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongo");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

export default dbConnection;
