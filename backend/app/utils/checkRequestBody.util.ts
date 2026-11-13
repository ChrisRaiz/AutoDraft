import { Request } from "express";
import HttpException from "./httpException.util";

async function checkRequestBody(
  body: Request["body"], // The request body
  requiredInputs: string[] // The required/expected inputs in the request body
): Promise<boolean> {
  if (!body || !requiredInputs)
    throw new HttpException(
      400,
      `Invalid argument passed to checkRequestBody()`
    );

  // Check that all required inputs are in the request body
  for (const input of requiredInputs) {
    if (!body[input] && body[input] !== 0) {
      throw new HttpException(400, `Invalid input: ${input}`);
    }
  }

  return true;
}

export default checkRequestBody;
