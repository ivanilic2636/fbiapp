const express = require("express");
const path = require("path");
const hbs = require("hbs");
const homeRoute = require("./routes/home");
const inputRecordRoute = require("./routes/input-record");
 
const app = express();
app.use(express.json());

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

app.use(homeRoute);
app.use(inputRecordRoute);


app.listen(3000, () => {
  console.log("App listening on port 3000");
});
