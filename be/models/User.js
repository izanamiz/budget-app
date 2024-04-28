import mongoose, { Schema, ObjectId } from "mongoose";
import pkg from 'validator';
const { isEmail } = pkg;

export default mongoose.model(
  "User",
  new Schema({
    id: {
      type: ObjectId,
    },
    name: {
      type: String,
      required: true, // NOT NULL
      validate: {
        validator: (value) => value.length >= 3,
        message: "Username must have at least 3 characters",
      },
    },
    email: {
      type: String,
      required: true, // NOT NULL
      validate: {
        validator: isEmail,
        message: "Email is incorrect format",
      },
    },
    password: {
      // hashed/encrypted password
      type: String,
      required: true,
      //   validate ??
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  })
);
