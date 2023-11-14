import { NextFunction, Request, Response } from "express";

export class ValidateToken {
  public verify(req: Request): [string?, string?] {
    const authorization = req.header("Authorization");
    if (!authorization) return ["No token provided"];
    if (!authorization.startsWith("Bearer "))
      return ["Invalid Bearer token provided"];

    const token = authorization.split(" ").at(1) || "";
    try {
      //todo
      //const payload

      return [undefined, token];
    } catch (error) {
      return ["Invalid token provided"];
      //internal server error
    }
    return [,];
  }
}
