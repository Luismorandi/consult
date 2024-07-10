import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = `${process.env.DB_URI}`;

const dbInit = async () => {
  await connect(DB_URI);
  console.log("Connected to MongoDB");
};

export default dbInit;
