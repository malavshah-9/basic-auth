import Ajv, { JSONSchemaType } from 'ajv';
import ajvFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import ResponseFormatter from '../../../util/ResponseFormatter';
const ajv = new Ajv();
ajvFormats(ajv);

interface user {
  email: string;
  password: string;
}

const userSchema: JSONSchemaType<user> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      format: 'password',
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};
const validate = ajv.compile(userSchema);

class Validator {
  validateUser(req: Request, res: Response, next: NextFunction) {
    const valid = validate(req.body);
    if (!valid) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid request data',
        validate.errors
      );
    }
    return next();
  }
}
export default new Validator();
