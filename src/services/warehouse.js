//viet api o day
import db from "../models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { v4 as generateId } from "uuid";

export const getWareHouse = ({ page, limit, name, userId, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_PRODUCT;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;

      // Thêm điều kiện where để chỉ lấy sản phẩm của userId cụ thể
      if (userId) {
        query.userId = userId;
      }

      // Thêm điều kiện where cho các trường khác nếu được chỉ định
      if (name) {
        query.name = { [Op.substring]: name };
      }

      const response = await db.WareHouse.findAndCountAll({
        where: query, // Sử dụng điều kiện where đã tạo
        ...queries,
      });
      resolve({
        err: response ? 0 : 1,
        message: response ? "Get Successfully" : "Cannot Found any Product",
        warehouseData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// CREATE

export const createWarehouse = async (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.WareHouse.findOrCreate({
        where: { userId: body.userId, warehouseName: body.warehouseName },
        defaults: {
          ...body,
          warehouseId: generateId(),
        },
      });
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Created Successfully" : "Cannot Create Warehouse",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

//UPDATE

export const updateWarehouse = ({ wid, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.WareHouse.update(body, {
        where: { warehouseId: wid },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} Warehouse updated`
            : "Cannot Update Warehouse/ Warehouse Not Found",
      });
    } catch (error) {
      reject(error);
    }
  });

//DELETE
export const deleteWarehouse = (wids) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.WareHouse.destroy({
        where: { warehouseId: wids },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes:
          response > 0
            ? `${response} Warehouse deleted`
            : "Cannot Delete Warehouse/ Warehouse Not Found",
      });
    } catch (error) {
      reject(error);
    }
  });
