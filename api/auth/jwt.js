const jwt = require('jsonwebtoken');

const { keys } = require('./../../config/secrets');

module.exports = {
  sign: (payload, options) => {
    // Token signing options
    const signOptions = {
      issuer: options.issuer,
      subject: options.subject,
      audience: options.audience,
      expiresIn: '30d',
      algorithm: 'RS256',
    };

    return jwt.sign({ data: payload }, keys.privateKey, signOptions);
  },
  verify: (token, option) => {
    const verifyOptions = {
      issuer: option.issuer,
      subject: option.subject,
      audience: option.audience,
      expiresIn: '30d',
      algorithm: ['RS256'],
    };

    try {
      return jwt.verify(token, keys.publicKey, verifyOptions);
    } catch (err) {
      return false;
    }
  },
  decode: token => jwt.decode(token, { complete: true }),
};
