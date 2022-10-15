const witnessForm = document.querySelector(".witness-form");
const title = witnessForm.querySelector(".title");
const number = witnessForm.querySelector(".phone-number");
const message = document.querySelector(".message");

witnessForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let caseTitle = title.value;
  let witnessNumber = number.value;
  if (caseTitle != "" && witnessNumber) {
    const getData = await fetch(
      `/input-record?title=${caseTitle}&number=${witnessNumber}`
    );
    let data = await getData.json();
    message.textContent = data.message;
    caseTitle = "";
    witnessNumber = "";
  } else {
    message.textContent = "Please enter all fields";
  }
});
