const fs = require("fs"),
  path = require("path"),
  request = require("request-promise"),
  CERT_FILE = path.resolve(__dirname, "../tpp/client.crt"),
  KEY_FILE = path.resolve(__dirname, "../tpp/client.key"),
  CA_FILE = path.resolve(__dirname, "../tpp/ca.crt"),
  URL_TST_CONNECT = "https://34.89.10.60:9443/tst-connect";

module.exports = {
  getConsentId: async () => {
    const options = {
      method: "GET",
      url: URL_TST_CONNECT,
      cert: fs.readFileSync(CERT_FILE),
      key: fs.readFileSync(KEY_FILE),
      ca: fs.readFileSync(CA_FILE),
      rejectUnauthorized: false,
    };
    const result = await request(options);
    return JSON.parse(result);
  },
};
