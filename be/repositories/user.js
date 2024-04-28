import Exception from "../exceptions/Exception.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    // not encrypt password!
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!!isMatched) {
      // create JWT
      const token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          // expiresIn: 60,
          expiresIn: "30 days",
        }
      );
      // clone and add more properties
      return {
        ...existingUser.toObject(),
        password: "Not shown",
        token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
  }
};
const register = async ({ name, email, password, phoneNumber, address }) => {
  // validation already done
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  // insert to db
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });

  return { ...newUser, password: "Not shown" };
};

export default {
  login,
  register,
};
