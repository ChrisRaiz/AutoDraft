import { NextFunction } from "express";
import { Request, Response } from "express";
import HttpException from "./httpException.util";

function errorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status ? err.status : 500;
  const message = status === 500 ? err : err.message;
  console.error(
    `[Error Handler]: Path: ${req.path}, Method: ${req.method}, ${err.stack}`
  );
  res.status(err.status || 500).json({ status: err.status, message: message });
}

module.exports = errorHandler;
