import user from "./user";
import auth from "./auth";
import insert from "./insert";
import product from "./product";
import warehouse from "./warehouse";
import { internalServerError } from "../middlewares/handle_errors";
import { notFound } from "../middlewares/handle_errors";
const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/insert", insert);
  app.use("/api/v1/product", product);
  app.use("/api/v1/warehouse", warehouse);
  app.use(notFound);
};

module.exports = initRoutes;
