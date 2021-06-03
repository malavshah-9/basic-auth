import Ajv, { JSONSchemaType } from 'ajv';
import ajvFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import ResponseFormatter from '../../../util/ResponseFormatter';
const ajv = new Ajv();
ajvFormats(ajv);

interface createCity {
  cityName: string;
  stateName: string;
}
const createCitySchema: JSONSchemaType<createCity> = {
  type: 'object',
  properties: {
    cityName: {
      type: 'string',
      minLength: 3,
      maxLength: 15,
    },
    stateName: {
      type: 'string',
      minLength: 3,
      maxLength: 15,
    },
  },
  required: ['cityName', 'stateName'],
  additionalProperties: false,
};
const validateCreateCity = ajv.compile(createCitySchema);
interface bulkCity {
  cities: createCity[];
}
const bulkCreateCity: JSONSchemaType<bulkCity> = {
  type: 'object',
  properties: {
    cities: {
      type: 'array',
      items: createCitySchema,
      minItems: 1,
      uniqueItems: true,
    },
  },
  required: ['cities'],
  additionalProperties: false,
};
const validateBulkCreateCity = ajv.compile(bulkCreateCity);
const deleteCity = {
  type: 'number',
};
const validateDeleteCity = ajv.compile(deleteCity);
class Validator {
  validateCreateCity(req: Request, res: Response, next: NextFunction) {
    const valid = validateCreateCity(req.body);
    if (!valid) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid request data',
        validateCreateCity.errors
      );
    }
    return next();
  }
  validateBulkCreateCity(req: Request, res: Response, next: NextFunction) {
    const valid = validateBulkCreateCity(req.body);
    if (!valid) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid request data',
        validateBulkCreateCity.errors
      );
    }
    return next();
  }
  validateDeleteCity(req: Request, res: Response, next: NextFunction) {
    const valid = validateDeleteCity(parseInt(req.params['id']));
    if (!valid) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid request data',
        validateDeleteCity.errors
      );
    }
    return next();
  }
}
export default new Validator();
