import Ajv, { JSONSchemaType } from 'ajv';
import ajvFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import ResponseFormatter from '../../../util/ResponseFormatter';
const ajv = new Ajv();
ajvFormats(ajv);

interface address {
  line1: string;
  line2: string;
  userId: number;
  cityId: number;
}
const createUpdateAddress: JSONSchemaType<address> = {
  type: 'object',
  properties: {
    line1: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
    },
    line2: {
      type: 'string',
      minLength: 0,
      maxLength: 100,
    },
    userId: {
      type: 'number',
    },
    cityId: {
      type: 'number',
    },
  },
  required: ['line1', 'userId', 'line2', 'cityId'],
  additionalProperties: false,
};
const validateCreateAddress = ajv.compile(createUpdateAddress);

const getAddress = {
  type: 'number',
};
const validateGetAddress = ajv.compile(getAddress);

const updateAddress = {
  type: 'number',
};
const validateUpdateAddress = ajv.compile(updateAddress);

class Validator {
  validateCreateAddress(req: Request, res: Response, next: NextFunction) {
    const valid = validateCreateAddress(req.body);
    if (!valid) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid request data',
        validateCreateAddress.errors
      );
    }
    return next();
  }
  validateGetAddressByUserId(req: Request, res: Response, next: NextFunction) {
    const valid = validateGetAddress(parseInt(req.params['userId']));
    if (!valid) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid request data',
        validateGetAddress.errors
      );
    }
    return next();
  }
  validateUpdateAddress(req: Request, res: Response, next: NextFunction) {
    const valid =
      validateUpdateAddress(parseInt(req.params['addressId'])) &&
      validateCreateAddress(req.body);
    if (!valid) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid request data',
        validateUpdateAddress.errors
          ? validateUpdateAddress.errors
          : validateCreateAddress.errors
      );
    }
    return next();
  }
  validateDeleteAddress(req: Request, res: Response, next: NextFunction) {
    const valid =
      validateUpdateAddress(parseInt(req.params['addressId'])) &&
      validateGetAddress(req.body['userId']);
    if (!valid) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid request data',
        validateUpdateAddress.errors
          ? validateUpdateAddress.errors
          : validateGetAddress.errors
      );
    }
    return next();
  }
}
export default new Validator();
