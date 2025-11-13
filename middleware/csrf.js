const { csrfSync } = require('csrf-sync');

const { csrfSynchronisedProtection, generateToken } = csrfSync({
  getTokenFromRequest: (req) => {
    return req.body["_csrf"] || 
           req.headers["csrf-token"] || 
           req.headers["x-csrf-token"];
  },
});

module.exports = {
  csrfSynchronisedProtection,
  generateToken
};