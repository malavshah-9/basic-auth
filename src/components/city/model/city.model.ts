import City from '../schema/city.schema';
import { City as CityType } from '../../../types/Cities';

class CityModel {
  async create(cityName: String, State: String): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await City.create({
          city_name: cityName,
          state: State,
        });
        resolve(dbResult.toJSON());
      } catch (e) {
        reject(e);
      }
    });
  }
  async update(cityName: String, cityId: number, state: String) {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await City.update(
          {
            city_name: cityName,
            state,
          },
          {
            where: {
              id: cityId,
            },
          }
        );
        resolve(dbResult);
      } catch (e) {
        reject(e);
      }
    });
  }
  async delete(cityId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await City.destroy({
          where: {
            id: cityId,
          },
        });
        resolve(dbResult);
      } catch (e) {
        reject(e);
      }
    });
  }
  async selectAll(obj: any, limit?: number, offset?: number) {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await City.findAndCountAll({
          where: {
            ...obj,
          },
          limit: limit,
          offset: offset,
        });
        resolve(dbResult);
      } catch (e) {
        reject(e);
      }
    });
  }
  async bulkCreate(cities: CityType[]) {
    return new Promise(async (resolve, reject) => {
      try {
        let dbResult = await City.bulkCreate(cities);
        resolve(dbResult);
      } catch (e) {
        reject(e);
      }
    });
  }
}
export default new CityModel();
