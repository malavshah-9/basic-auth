import { DataTypes, Model } from 'sequelize';
import DBClient from '../../../util/dbConfig';

class Address extends Model {}
Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    line1: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    line2: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: DBClient.getClient(),
    tableName: 'Address',
    modelName: 'Address',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
  }
);

export default Address;
