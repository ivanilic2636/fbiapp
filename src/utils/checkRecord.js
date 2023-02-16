const got = require("got");
//const axios = require("axios")

const checkRecord = async (data) => {
  try {
    const response = await got("https://api.fbi.gov/wanted/v1/list", {
      json: true,
    });
  //  const response = await axios.get("https://api.fbi.gov/wanted/v1/list", { withCredentials: true });
    const allRecords = response.body.items;
    const findRecord = allRecords.find((record) => {
      //if the title is unique than we can maybe use include otherwise if we want to be precise we would use record.title === data
      if (record.title === data) {
        return record;
      }
    });
    if (findRecord) {
      return { record: findRecord };
    } else {
      return { record: false };
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = checkRecord;
