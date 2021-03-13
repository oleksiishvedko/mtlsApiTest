const express = require("express");
const router = express.Router();

const { encrypt } = require("../services/cipher");
const { getConsentId } = require("../services/thirdPartyApi");

router.get("/", async (req, res) => {
  try {
    const { consentId } = await getConsentId();
    const encryptedData = encrypt(consentId);

    const data = { consentId: encryptedData };
    const collection = req.app.locals.collection;
    await collection.insertOne(data);

    res.send(data);
  } catch (e) {
    console.error(e);
  }
});

router.get("/consent-ids", async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const consentIds = await collection.find({}).toArray();

    res.send(consentIds);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
