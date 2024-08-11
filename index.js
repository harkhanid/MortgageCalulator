const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = form.elements["amount"].value;
  const term = form.elements["term"].value;
  const rate = form.elements["rate"].value;
  const type = form.elements["type"].value;
  let validForm = true;

  // amount validation
  if (!basicValidation("amount", amount)) {
    validForm = false;
  }

  //term validation
  if (
    (!basicValidation("term", term) && 0 > Number(term)) ||
    Number(term) > 31
  ) {
    displayError("term", "term should be between 1 and 30");
    validForm = false;
  }

  //rate validation
  if (
    (!basicValidation("rate", rate) && 0 > Number(rate)) ||
    Number(rate) > 100
  ) {
    displayError("rate", "term should be between 1 and 30");
    validForm = false;
  }

  //type validation
  if (!basicValidation("type", type)) {
    validForm = false;
  }
  if (validForm == true) {
    calculateAmount(
      getNumberFromCSN(amount),
      getNumberFromCSN(term),
      getNumberFromCSN(rate),
      type
    );
  }
});

document.getElementById("amount").addEventListener("input", function (e) {
  let value = e.target.value;
  const convertedNumber = convertNumber(value);
  e.target.value = convertedNumber;
});

document.getElementById("term").addEventListener("input", function (e) {
  let value = e.target.value;
  value = value.replace(/[^0-9.]/g, "");
  e.target.value = value;
});

document.getElementById("rate").addEventListener("input", function (e) {
  let value = e.target.value;
  value = value.replace(/[^0-9.]/g, "");
  e.target.value = value;
});

const calculateAmount = (amount, term, rate, type) => {
  const numOfPayments = term * 12;
  const monthlyrate = rate / 100 / 12;
  let monthlypayment = 0;
  let totalPayment = 0;
  if (type === "repayment") {
    monthlypayment =
      amount *
      monthlyrate *
      (Math.pow(1 + monthlyrate, numOfPayments) /
        (Math.pow(1 + monthlyrate, numOfPayments) - 1));
    totalPayment = monthlypayment * numOfPayments;
  } else {
    totalPayment = (amount * rate * term) / 100;
    monthlypayment = totalPayment / 12 / term;
  }

  document.getElementById("monthly-result").innerHTML = convertNumber(
    monthlypayment.toFixed(2)
  );
  document.getElementById("total-pending").innerHTML = convertNumber(
    totalPayment.toFixed(2)
  );
  document.getElementById("after-result").classList.remove("hide");
  document.getElementById("before-result").classList.add("hide");
};

const basicValidation = (id, input) => {
  if (input === "") {
    displayError(id, "this field is required");
    return false;
  }
  return true;
};

const convertNumber = (value) => {
  value = value.replace(/[^0-9.]/g, "");

  const parts = value.split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
};

const focusFn = (id) => {
  const divContainer = document.getElementById(id + "-container");
  if (id !== "type") {
    divContainer.classList.remove("error-container");
  }
  divContainer.nextElementSibling.innerHTML = "";
};

const clearFn = () => {
  document.getElementById("after-result").classList.add("hide");
  document.getElementById("before-result").classList.remove("hide");
};

const getNumberFromCSN = (string) => {
  return Number(string.replace(/,/g, ""), 10);
};

const displayError = (id, message) => {
  const divContainer = document.getElementById(id + "-container");
  if (id !== "type") {
    divContainer.classList.add("error-container");
  }
  divContainer.nextElementSibling.innerHTML = message;
};
