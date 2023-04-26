import { GOOGLE_AUTH_CLIENT_ID } from "@/config";
import ValidationError from "@/utils/error/validation_error";
import {
  responseErrorWithMessage,
  responseSuccessWithData,
} from "@/utils/response";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class AuthController {
  static jwt = async (req: Request, res: Response) => {
    try {
      const data = jwt.decode(req.body.credential);
      if (!req.body.credential) throw new ValidationError("Invalid Credential");
      res.cookie("credential", req.body.credential, {
        expires: new Date(new Date().setDate(new Date().getDate() + 7)),
        httpOnly: true,
        secure: true,
      });
      res.status(200).json(responseSuccessWithData(data));
    } catch (error) {
      if (error instanceof ValidationError) {
        // response on custom error
        return res.status(400).json(responseErrorWithMessage(error.message));
      }
      // response on default error
      res.status(500).json(responseErrorWithMessage());
    }
  };

  static loginView = async (req: Request, res: Response) => {
    try {
      res.render("login", {
        google_client_id: GOOGLE_AUTH_CLIENT_ID,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        // response on custom error
        return res.status(400).json(responseErrorWithMessage(error.message));
      }
      // response on default error
      res.status(500).json(responseErrorWithMessage());
    }
  };
}
