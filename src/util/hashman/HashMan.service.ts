import bcrypt from 'bcryptjs';

class HashMan {
  async getHashedKey(dataKey) {
    return new Promise(async (resolve, reject) => {
      try {
        let derivedKey = await bcrypt.hash(dataKey, await bcrypt.genSalt(10));
        return resolve(derivedKey);
      } catch (e) {
        return reject(e);
      }
    });
  }
  async compare(dataKey: string, actualDataKey: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await bcrypt.compare(dataKey, actualDataKey);
        return resolve(result);
      } catch (e) {
        return reject(e);
      }
    });
  }
}

export default new HashMan();
