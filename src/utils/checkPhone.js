const { phone } = require("phone");

const checkPhone = (number) => {
  let phoneObj = phone("+" + number.replace(/\D/g, ""));
  return phoneObj;
};

module.exports = checkPhone;
