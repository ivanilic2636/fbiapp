const { phone } = require("phone");

const checkPhone = (number) => {
  const phoneObj = phone(number);
  return phoneObj;
};

module.exports = checkPhone;
