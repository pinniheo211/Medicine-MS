//viet api o day
import db from "../models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateUserId } from "../helper/function";

const hashPassword = (password) =>
  bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

export const register = ({ username, email, phone, password, company }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          username: username,
          email: email,
          phone: phone,
          company: company,
          userId: generateUserId(),
          password: hashPassword(password),
        },
      });

      resolve({
        err: response[1] ? 0 : 1,
        message: response[1] ? "Successfully" : "Email has exist",
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });
      const isChecked =
        response && bcryptjs.compareSync(password, response.password);

      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: token ? 0 : 1,
        message: token
          ? "Login Successfully"
          : response
          ? "Wrong Password"
          : "Email is not registered",
        access_token: token ? token : null,
      });
    } catch (error) {
      reject(error);
    }
  });
