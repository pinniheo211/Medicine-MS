import createError from "http-errors";

export const internalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    err: 1,
    mess: error.message,
  });
};

export const badRequest = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    err: 1,
    mess: error.message,
  });
};

export const notFound = (res) => {
  const error = createError.NotFound("This route is not define");
  return res.status(error.status).json({
    err: 1,
    mess: error.message,
  });
};

export const notAuthor = (err, res) => {
  const error = createError.Unauthorized(err);
  return res.status(error.status).json({
    err: 1,
    mess: error.message,
  });
};
