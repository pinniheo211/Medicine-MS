import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import {
  name,
  price,
  available,
  category_code,
  image,
  pid,
  pids,
} from "../helper/schema";
import joi from "joi";
const cloudinary = require("cloudinary").v2;

export const getProduct = async (req, res) => {
  try {
    const response = await services.getProducts(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

//CREATE

export const createProduct = async (req, res) => {
  try {
    const fileData = req.file;
    console.log(fileData);
    const { error } = joi
      .object({
        name,
        price,
        available,
        category_code,
        image,
      })
      .validate({ ...req.body, image: fileData?.path });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }
    const response = await services.createNewProduct(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

//UPDATE PRODUCT

export const updateProduct = async (req, res) => {
  try {
    const fileData = req.file;
    const { error } = joi
      .object({
        pid,
      })
      .validate({ pid: req.body.pid });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }
    const response = await services.updateProduct(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

//DELETE PRODUCT

export const deleteProduct = async (req, res) => {
  try {
    const { error } = joi
      .object({
        pids,
      })
      .validate(req.query);
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.deleteProduct(req.query.pids);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
