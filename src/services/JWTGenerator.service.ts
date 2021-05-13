import jwt from 'jsonwebtoken';
import ENV from '../config/environment';

class JWTGenerator {
  constructor() {}
  async signToken(payload, expireTime = '1h') {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        String(ENV.JWT_SECRET),
        {
          algorithm: 'HS256',
          encoding: 'utf-8',
          expiresIn: expireTime,
        },
        (err, token) => {
          if (err) return reject(err);
          resolve(token);
        }
      );
    });
  }
}
export default new JWTGenerator();
