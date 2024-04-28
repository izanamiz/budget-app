import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function checkToken(req, res, next) {
  // bypass login, register
  /*
  if (
    req.url.toLowerCase().trim() == "/users/login" ||
    req.url.toLowerCase().trim() == "/users/register"
  ) {
    next();
    return;
  }
  //other requests
  //get and validate token

  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);

    const userId = jwtObject?.data?._id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ error: "Not found user" });
    }

    next();
  } catch (error) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ error: "Not authorized to access this resource" });
  }
  */
  next();
}
