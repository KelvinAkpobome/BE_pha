const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// load config
dotenv.config({ path: './config/config.env' });

exports.signJWT = (data, time = '1d') => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(data, secret, { expiresIn: time });
};

exports.verifyJWT = (token) => {
  const key = process.env.JWT_SECRET;
  return jwt.verify(token, key, (err, decoded) => {
    if (err) {
      // console.log(err.message)
      return new Error(`${err}`);
    }
    return decoded;
  });
};
