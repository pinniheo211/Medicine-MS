import db from "../models";
import data from "../../data/data.json";
import { generateCode } from "../helper/function";
export const insertData = () =>
  new Promise(async (resolve, reject) => {
    try {
      const categories = Object.keys(data);
      categories.forEach(async (item) => {
        await db.Category.create({
          code: generateCode(item),
          value: item,
        });
      });
      const dataArr = Object.entries(data);
      dataArr.forEach((item) => {
        item[1]?.map(async (product) => {
          await db.Product.create({
            id: product.id,
            name: product.name,
            price: product.price,
            available: +product.available,
            image: product.image,
            description: product.description,
            category_code: generateCode(item[0]),
          });
        });
      });
      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
