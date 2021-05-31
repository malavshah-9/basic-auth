import AddressSchema from './address.schemta';
import UserSchema from '../../user/schema/user.schema';

UserSchema.hasMany(AddressSchema, {
  foreignKey: 'userId',
});
AddressSchema.belongsTo(UserSchema, {
  foreignKey: 'userId',
});

export { AddressSchema };
