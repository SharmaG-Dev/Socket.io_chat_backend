import { NextFunction, Request, Response } from "express";

export const AuthVerify = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.header);
};
