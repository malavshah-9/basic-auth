import { Router } from 'express';
import addressController from './address.controller';

const AddressRouter = Router();

AddressRouter.post('/address', addressController.create);
AddressRouter.get('/address/:userId', addressController.getByUserId);
AddressRouter.put('/address/:addressId', addressController.updateAddress);

export default AddressRouter;
