import jwt from "jsonwebtoken";
import { notAuthor } from "./handle_errors";
// middleware nó sẽ chặn ở giữa route để check token rồi mới get user
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return notAuthor("Require authorization", res);

  const accessToken = token.split(" ")[1];
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return notAuthor("Access token invalid", res);
    req.user = user;
    next();
  });
};
