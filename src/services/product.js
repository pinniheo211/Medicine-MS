//viet api o day
import db from "../models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { v4 as generateId } from "uuid";

const cloudinary = require("cloudinary").v2;

export const getProducts = ({
  page,
  limit,
  order,
  name,
  available,
  ...query
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_PRODUCT;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      if (order) {
        queries.order = [order];
      }
      if (name) {
        query.name = { [Op.substring]: name };
      }
      if (available) {
        query.available = { [Op.between]: available };
      }
      const response = await db.Product.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          excluede: ["category_code"],
        },
        include: [
          {
            model: db.Category,
            attributes: { exclude: ["createAt,updateAt"] },
            as: "categoryData",
          },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        message: response ? "Get Successfully" : "Cannot Found any Product",
        productData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// CREATE

export const createNewProduct = (body, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findOrCreate({
        where: { name: body?.name },
        defaults: {
          ...body,
          id: generateId(),
          image: fileData?.path,
        },
      });
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Created Successfully" : "Cannot Create Product",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });
