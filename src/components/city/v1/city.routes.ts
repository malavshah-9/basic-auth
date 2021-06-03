import { Router } from 'express';
import CityController from './city.controller';
import Validator from './city.validation';

const CityRouter = Router();

CityRouter.post(
  '/city',
  Validator.validateCreateCity,
  CityController.createCity
);
CityRouter.get('/city', CityController.formatCities, CityController.getCities);
CityRouter.post(
  '/cities',
  Validator.validateBulkCreateCity,
  CityController.bulkCreate
);
CityRouter.delete(
  '/city/:id',
  Validator.validateDeleteCity,
  CityController.delete
);
export default CityRouter;
