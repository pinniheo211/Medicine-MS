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
  name,
  available,
  userId,
  warehouseId,
  ...query
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_PRODUCT;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;

      // Thêm điều kiện where để chỉ lấy sản phẩm của userId hoặc warehouseId
      if (userId) {
        query.userId = userId;
      }
      if (warehouseId) {
        query.warehouseId = warehouseId;
      }

      // Thêm điều kiện where cho các trường khác nếu được chỉ định
      if (name) {
        query.name = { [Op.substring]: name };
      }
      if (available) {
        query.available = { [Op.between]: available };
      }

      const response = await db.Product.findAndCountAll({
        where: query, // Sử dụng điều kiện where đã tạo
        ...queries,
        attributes: {
          exclude: ["category_code"],
        },
        include: [
          {
            model: db.Category,
            attributes: { exclude: ["createAt", "updateAt"] },
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
      console.log(error);
      reject(error);
    }
  });

// CREATE

export const createNewProduct = async (body, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findOrCreate({
        where: { userId: body.userId, name: body.name },
        defaults: {
          ...body,
          id: generateId(),
          image: fileData?.path,
          filename: fileData?.filename,
        },
      });
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Created Successfully" : "Cannot Create Product",
      });

      // Xóa hình ảnh nếu sản phẩm không được tạo thành công
      if (fileData && !response[1]) {
        cloudinary.uploader.destroy(fileData.filename);
      }
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });

//UPDATE

export const updateProduct = ({ pid, ...body }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      if (fileData) body.imge = fileData?.path;
      const response = await db.Product.update(body, {
        where: { id: pid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} product updated`
            : "Cannot Update Product/ Product Not Found",
      });
      if (fileData && response[0] === 0)
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });

//DELETE
export const deleteProduct = (pids) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.destroy({
        where: { id: pids },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes:
          response > 0
            ? `${response} product deleted`
            : "Cannot Delete Product/ Product Not Found",
      });
    } catch (error) {
      reject(error);
    }
  });
