const witnessForm = document.querySelector(".witness-form");
const title = witnessForm.querySelector(".title");
const number = witnessForm.querySelector(".phone-number");
const message = document.querySelector(".message");

const caseRecordFunction = async () => {
  const caseTitle = title.value;
  const witnessNumber = number.value;
  if (caseTitle !== "" && witnessNumber) {
    const getData = await fetch(
      `/input-record?title=${caseTitle}&number=${witnessNumber}`
    );
    const data = await getData.json();
    message.textContent = data.message;
    title.value = "";
    number.value = "";
  } else {
    message.textContent = "Please enter all fields";
  }
};

witnessForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await caseRecordFunction();
});
