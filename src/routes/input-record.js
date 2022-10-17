const express = require("express");
const router = new express.Router();

const checkRecord = require("../utils/checkRecord");
const checkPhone = require("../utils/checkPhone");
const fs = require("fs/promises");

router.get("/input-record", async (req, res) => {
  const { title, number } = req.query;
  const witnessData = {};
  const caseTitle = title.toUpperCase();
  const decodedNumber = decodeURIComponent(number);
  const contactPhone = checkPhone(decodedNumber);
  const recordData = await checkRecord(caseTitle);
  if (contactPhone.isValid && recordData.record) {
    witnessData.phoneNumber = contactPhone.phoneNumber;
    witnessData.country = contactPhone.countryIso3;
    witnessData.record = recordData.record;
    await fs.appendFile("witness.json", JSON.stringify(witnessData) + "\r\n");
    res.send({ message: "Your case title and phone number have been stored" });
  }
  if (recordData.record == false) {
    res.send({ message: "The case data you entered is not valid" });
  }
  if (!contactPhone.isValid) {
    res.send({ message: "The phone number you entered is not valid" });
  }
});

module.exports = router;
