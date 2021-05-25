import { DataTypes, Model } from 'sequelize';
import DBClient from '../../../util/dbConfig';

class City extends Model {}
City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    city_name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
  {
    sequelize: DBClient.getClient(),
    tableName: 'City',
    modelName: 'City',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['city_name', 'state'],
      },
    ],
  }
);
export default City;
