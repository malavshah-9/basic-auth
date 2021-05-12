import jwt from 'jsonwebtoken';
import ENV from '../config/environment';

class JWTGenerator {
  constructor() {}
  async signToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        String(ENV.JWT_SECRET),
        {
          algorithm: 'HS256',
          encoding: 'utf-8',
          expiresIn: '1h',
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
