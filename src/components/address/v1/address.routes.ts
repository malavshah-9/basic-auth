import { Router } from 'express';
import addressController from './address.controller';

const AddressRouter = Router();

AddressRouter.post('/address', addressController.create);

export default AddressRouter;
