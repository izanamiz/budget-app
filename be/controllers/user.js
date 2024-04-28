import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const myEvent = new EventEmitter();
// listen
myEvent.on("event.register.user", (params) => {
  console.log(`They talked about: ${JSON.stringify(params)}`);
});

const getAllUsers = async (req, res) => {
  res.send("GET users");
};

const getUserByID = async (req, res) => {
  res.send("GET detailed user by id: " + req?.params?.id);
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  // call repository constructor
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
};

const register = async (req, res) => {
  // destructure
  const { name, email, password, phoneNumber, address } = req?.body;

  //Event Emitter
  myEvent.emit("event.register.user", { email, address });

  try {
    const existingUser = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register user successfully",
      data: existingUser,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
};

export default {
  getAllUsers,
  login,
  register,
  getUserByID,
};
