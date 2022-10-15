const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs/promises");

const checkRecord = require("./utils/checkRecord");
const checkPhone = require("./utils/checkPhone");
const e = require("express");

const app = express();
app.use(express.json());

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/input-record", async (req, res) => {
  let { title, number } = req.query;
  let witnessData = {};
  console.log(title);
  let caseTitle = title.toUpperCase();
  let contactPhone = checkPhone(number);
  let recordData = await checkRecord(caseTitle);
    console.log(recordData.record);
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

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
