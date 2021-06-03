import AddressSchema from './address.schemta';
import UserSchema from '../../user/schema/user.schema';
import CitySchema from '../../city/schema/city.schema';

UserSchema.hasMany(AddressSchema, {
  foreignKey: 'userId',
});
AddressSchema.belongsTo(UserSchema, {
  foreignKey: 'userId',
});

CitySchema.hasMany(AddressSchema);
AddressSchema.belongsTo(CitySchema);

export { AddressSchema };
