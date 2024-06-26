import joi from "joi";

// export const email = joi
//   .string()
//   .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
//   .required();

export const email = joi.string().pattern(new RegExp("gmail.com")).required();

export const password = joi.string().min(6).required();
export const username = joi.string().min(3).required();
export const phone = joi
  .string()
  .regex(/^[0-9]{10}$/)
  .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
  .required();
export const company = joi.string().max(100).required();

export const name = joi.string().required();
export const price = joi.number().required();
export const available = joi.number().required();
export const category_code = joi.string().uppercase().alphanum().required();
export const image = joi.string().required();
export const userId = joi.number().required();
export const description = joi.string().required();
export const status = joi.number().required();
export const warehouseName = joi.string().required();
export const address = joi.string().required();
export const pid = joi.string().required();
export const wid = joi.string().required();
export const wids = joi.array().required();
export const pids = joi.array().required();
export const namep = joi.string();
