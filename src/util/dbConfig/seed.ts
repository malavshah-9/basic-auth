import { Sequelize } from 'sequelize/types';

export const Up = async (sequelize: Sequelize) => {
  let queryInterface = sequelize.getQueryInterface();

  return new Promise((resolve, reject) => {
    try {
      let createResult = queryInterface.bulkInsert('City', [
        {
          city_name: 'Ahmedabad',
          state: 'Gujarat',
        },
        {
          city_name: 'Surat',
          state: 'Gujarat',
        },
        {
          city_name: 'Rajkot',
          state: 'Gujarat',
        },
        {
          city_name: 'Morbi',
          state: 'Gujarat',
        },
      ]);
      resolve(createResult);
    } catch (e) {
      console.log(' Error in seeding ', e);
      reject(e);
    }
  });
};
