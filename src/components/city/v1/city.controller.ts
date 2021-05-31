import { Response, Request, NextFunction } from 'express';
import ResponseFormatter from '../../../util/ResponseFormatter';
import STATUS_CODES from 'http-status-codes';
import CityModel from '../model/city.model';

class CityController {
  async createCity(req: Request, res: Response) {
    try {
      let cityName = req.body.cityName;
      let stateName = req.body.stateName;
      let modelResult = await CityModel.create(cityName, stateName);
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.OK,
        modelResult
      );
    } catch (e) {
      console.log(' error while creating city ', e);
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Internal Server'
      );
    }
  }
  async formatCities(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const limit = parseInt(req.query['limit']) || 10;
    // @ts-ignore
    const offset = parseInt(req.query['offset']) || 0;
    let cityName = req.query['city'] ? req.query['city'] : undefined;
    let stateName = req.query['state'] ? req.query['state'] : undefined;
    let temp = {};
    if (cityName) {
      temp['city_name'] = cityName;
    }
    if (stateName) {
      temp['state'] = stateName;
    }
    const attributes = {
      limit,
      offset,
      whereClause: temp,
    };
    res.locals.where = attributes;
    next();
  }
  async getCities(req: Request, res: Response) {
    try {
      console.log(' res.locals ', res.locals);
      let cities = await CityModel.selectAll(
        res.locals.where.whereClause,
        res.locals.where.limit,
        res.locals.where.offset
      );
      return ResponseFormatter.createResponse(res, 200, '', cities);
    } catch (e) {
      console.log(' error while geting cities ', e);
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Internal Server Error'
      );
    }
  }
  async bulkCreate(req: Request, res: Response) {
    try {
      const cities = req.body.cities.map((item) => {
        return {
          city_name: item.cityName,
          state: item.stateName,
        };
      });
      const cityCreatResult = await CityModel.bulkCreate(cities);
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.OK,
        'All cities inserted successfully! ',
        cityCreatResult
      );
    } catch (e) {
      console.log(' Error while creating bulk create cities ', e);
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Error in bulk create'
      );
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const deleteId = req.params.id;
      if (deleteId) {
        const deleteResult = await CityModel.delete(parseInt(deleteId));
        if (deleteResult && parseInt(deleteResult + '') > 0) {
          return ResponseFormatter.createResponse(
            res,
            STATUS_CODES.OK,
            'City deleted successfully!',
            deleteResult
          );
        }
      }
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.BAD_REQUEST,
        'Invalid CityId!'
      );
    } catch (e) {
      return ResponseFormatter.createResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        'Error in delete'
      );
    }
  }
}

export default new CityController();
