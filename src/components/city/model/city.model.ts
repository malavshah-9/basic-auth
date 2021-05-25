import City from '../schema/city.schema';

class CityModel {
  async create(cityName: String, State: String): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let dbResult = await City.create({
          city_name: cityName,
          state: State,
        });
        resolve(dbResult);
      } catch (e) {
        reject(e);
      }
    });
  }
}
export default CityModel;
