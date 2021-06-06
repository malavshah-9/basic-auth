import { Router } from 'express';
import addressController from './address.controller';
import validator from './address.validator';

const AddressRouter = Router();

AddressRouter.post(
  '/address',
  validator.validateCreateAddress,
  addressController.create
);
AddressRouter.get(
  '/address/:userId',
  validator.validateGetAddressByUserId,
  addressController.getByUserId
);
AddressRouter.put(
  '/address/:addressId',
  validator.validateUpdateAddress,
  addressController.updateAddress
);
AddressRouter.delete(
  '/address/:addressId',
  validator.validateDeleteAddress,
  addressController.deleteAddress
);

export default AddressRouter;
