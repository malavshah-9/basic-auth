import ResponseFormatter from '../../../util/ResponseFormatter';
import { NextFunction, Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import AddressModel from '../model/address.model';
import logger from '../../../util/logger/logger';

class AddressController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let dbResult = await AddressModel.create(
        req.body.line1,
        req.body.line2,
        req.body.userId,
        req.body.cityId
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.OK,
        'Address inserted successfully',
        dbResult
      );
    } catch (e) {
      logger.error(
        __dirname,
        'Error ocurred in create of addressController',
        'POST',
        e
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Internal Server Error'
      );
    }
  }
  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      let dbResult = await AddressModel.findByUserId(
        parseInt(req.params.userId)
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.OK,
        'Addresses fetched successfully',
        dbResult
      );
    } catch (e) {
      logger.error(
        __dirname,
        'Error ocurred in getByUserId of addressController',
        'GET',
        e
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Internal Server Error'
      );
    }
  }
  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      let dbResult = await AddressModel.update(
        parseInt(req.params.addressId),
        req.body.line1,
        req.body.line2,
        req.body.userId,
        req.body.cityId
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.OK,
        'Address updated successfully',
        dbResult
      );
    } catch (e) {
      logger.error(
        __dirname,
        'Error ocurred in updateAddress of addressController',
        'PUT',
        e
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Internal Server Error'
      );
    }
  }
  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      let dbResult = await AddressModel.delete(
        parseInt(req.params.addressId),
        parseInt(req.body.userId)
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.OK,
        'Address deleted successfully',
        dbResult
      );
    } catch (e) {
      logger.error(
        __dirname,
        'Error ocurred in deleteAddress of addressController',
        'DELETE',
        e
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Internal Server Error'
      );
    }
  }
}

export default new AddressController();
