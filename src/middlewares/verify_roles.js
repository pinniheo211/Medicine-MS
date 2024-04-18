import { notAuthor } from "./handle_errors";

export const isAdmin = (req, res, next) => {
  const { role_code } = req.user;
  if (role_code !== "R1") return notAuthor("Require role Admin", res);
  next();
};

export const isdModeratorOrAdmin = (req, res, next) => {
  const { role_code } = req.user;
  if (role_code !== "R1" && role_code !== "R2")
    return notAuthor("Require role Admin or Moderator", res);
  next();
};
