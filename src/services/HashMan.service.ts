import pbkdf2 from 'pbkdf2';

class HashMan {
  async getHashedKey(dataKey) {
    return new Promise((resolve, reject) => {
      try {
        let derivedKey = pbkdf2.pbkdf2Sync(dataKey, 'test123', 1, 15);
        return resolve(derivedKey);
      } catch (e) {
        return reject(e);
      }
    });
  }
}

export default new HashMan();
