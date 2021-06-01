import ResponseFormatter from '../../../util/ResponseFormatter';
import { NextFunction, Request, Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import AddressModel from '../model/address.model';

class AddressController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let dbResult = await AddressModel.create(
        req.body.line1,
        req.body.line2,
        req.body.userId
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.OK,
        'Address inserted successfully',
        dbResult
      );
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
        req.body.userId
      );
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.OK,
        'Addresses updated successfully',
        dbResult
      );
    } catch (e) {
      console.log(e);
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Internal Server Error'
      );
    }
  }
}

export default new AddressController();
