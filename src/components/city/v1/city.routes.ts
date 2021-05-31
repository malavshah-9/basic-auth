import CityController from './city.controller';
import { Router } from 'express';

const CityRouter = Router();

CityRouter.post('/city', CityController.createCity);
CityRouter.get('/city', CityController.formatCities, CityController.getCities);
CityRouter.post('/cities', CityController.bulkCreate);
CityRouter.delete('/city/:id', CityController.delete);
export default CityRouter;
