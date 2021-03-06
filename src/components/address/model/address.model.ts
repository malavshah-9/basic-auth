import { AddressSchema } from '../schema';
import userSchema from '../../user/schema/user.schema';
class AddressModel {
  async create(
    line1: String,
    line2: String,
    userId: number,
    cityId: number
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await AddressSchema.create({
          line1,
          line2,
          userId,
          cityId,
        });
        resolve(dbResult.toJSON());
      } catch (e) {
        reject(e);
      }
    });
  }
  async findByUserId(userId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await AddressSchema.findAndCountAll({
          include: {
            model: userSchema,
            required: true,
            attributes: [],
          },
          where: {
            userId,
          },
        });
        resolve(dbResult);
      } catch (e) {
        reject(e);
      }
    });
  }
  async update(
    addressId: number,
    line1: string,
    line2: string,
    userId: number,
    cityId: number
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await AddressSchema.update(
          {
            line1,
            line2,
            userId,
            cityId,
          },
          {
            where: {
              id: addressId,
            },
          }
        );
        resolve(dbResult);
      } catch (e) {
        reject(e);
      }
    });
  }
  async delete(addressId: number, userId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await AddressSchema.destroy({
          where: {
            id: addressId,
            userId,
          },
        });
        resolve(dbResult);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default new AddressModel();
