const { phone } = require("phone");

const checkPhone = (number) => {
  const phoneObj = phone("+" + number.replace(/\D/g, ""));
  return phoneObj;
};

module.exports = checkPhone;
