import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    print("Connect mongoose successful", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    const { code } = error;
    if (code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }
    throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
  }
};

export default connect;
