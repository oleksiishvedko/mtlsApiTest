const crypto = require("crypto");

module.exports = {
  encrypt: (data) => {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync("secret", "salt", 32);

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    return cipher.update(data, "utf8", "hex") + cipher.final("hex");
  },
};
