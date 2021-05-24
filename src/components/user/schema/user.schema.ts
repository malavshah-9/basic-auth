import { DataTypes, Sequelize, Model } from 'sequelize';
import DBClient from '../../../util/dbConfig';

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: DBClient.getClient(),
    modelName: 'User',
    tableName: 'User',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
export default User;
