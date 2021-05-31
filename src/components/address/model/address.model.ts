import { AddressSchema } from '../schema';

class AddressModel {
  async create(line1: String, line2: String, userId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await AddressSchema.create({
          line1,
          line2,
          userId,
        });
        resolve(dbResult.toJSON());
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default new AddressModel();
