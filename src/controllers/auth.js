// quan li api tu service (giao task cho service)

import { response } from "express";
import * as services from "../services/auth";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { email, password, username, phone, company } from "../helper/schema";
import joi from "joi";

export const register = async (req, res) => {
  try {
    const { error } = joi
      .object({
        username,
        email,
        phone,
        password,
        company,
      })
      .validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    const { error } = joi
      .object({
        email,
        password,
      })
      .validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
