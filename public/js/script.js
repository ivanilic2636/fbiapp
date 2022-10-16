const witnessForm = document.querySelector(".witness-form");
const title = witnessForm.querySelector(".title");
const number = witnessForm.querySelector(".phone-number");
const message = document.querySelector(".message");

const caseRecordFunction = async () => {
  let caseTitle = title.value;
  let witnessNumber = number.value;
  if (caseTitle !== "" && witnessNumber) {
    const getData = await fetch(
      `/input-record?title=${caseTitle}&number=${witnessNumber}`
    );
    let data = await getData.json();
    message.textContent = data.message;
    title.value = "";
    number.value = "";
  } else {
    message.textContent = "Please enter all fields";
  }
};

witnessForm.addEventListener("submit", (e) => {
  e.preventDefault();
  caseRecordFunction();
});
