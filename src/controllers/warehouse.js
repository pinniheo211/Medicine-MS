import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import {
  userId,
  status,
  warehouseName,
  address,
  phone,
  wid,
  wids,
} from "../helper/schema";
import joi from "joi";

export const getWarehouse = async (req, res) => {
  try {
    const { userId, ...query } = req.query;
    const response = await services.getWareHouse({ ...query, userId });
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

//CREATE

export const createWarehouse = async (req, res) => {
  try {
    const { error } = joi
      .object({
        warehouseName,
        status,
        userId,
        address,
        phone,
      })
      .validate({ ...req.body });
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.createWarehouse(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

//UPDATE PRODUCT

export const updateWarehouse = async (req, res) => {
  try {
    const { error } = joi
      .object({
        wid,
      })
      .validate({ wid: req.body.wid });
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.updateWarehouse(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

// //DELETE PRODUCT

export const deleteWarehouse = async (req, res) => {
  try {
    const { error } = joi
      .object({
        wids,
      })
      .validate(req.query);
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.deleteWarehouse(req.query.wids);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
