const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKEY = fs.readFileSync('./assets/private.key', 'utf8');
const publicKEY = fs.readFileSync('./assets/public.key', 'utf8');

module.exports = {
  sign: (payload, $Options) => {
    /*
     sOptions = {
      issuer: 'Authorizaxtion/Resource/This server',
      subject: 'iam@user.me',
      audience: 'Client_Identity' // this should be provided by client
     }
    */
    // Token signing options
    const signOptions = {
      issuer: $Options.issuer,
      subject: $Options.subject,
      audience: $Options.audience,
      expiresIn: '30d',
      algorithm: 'RS256',
    };

    return jwt.sign({ data: payload }, privateKEY, signOptions);
  },
  verify: (token, $Option) => {
    /*
     vOption = {
      issuer: 'Authorization/Resource/This server',
      subject: 'iam@user.me',
      audience: 'Client_Identity' // this should be provided by client
     }
    */
    const verifyOptions = {
      issuer: $Option.issuer,
      subject: $Option.subject,
      audience: $Option.audience,
      expiresIn: '30d',
      algorithm: ['RS256'],
    };

    try {
      return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  decode: token => jwt.decode(token, { complete: true }),
};
