// TO CONNECT DATABASE TO NODEJS
// MONGODB TO NODEJS
// => use MONGOOSE
// connection string -> .env file -> connectDB() call in server.js

import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;
