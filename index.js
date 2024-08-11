const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = form.elements["amount"].value;
  const term = form.elements["term"].value;
  const rate = form.elements["rate"].value;
  const type = form.elements["type"].value;
  let validForm = true;
  if (!basicValidation("amount", amount)) {
    validForm = false;
  }

  if (
    (!basicValidation("term", term) && 0 > Number(term)) ||
    Number(term) > 31
  ) {
    displayError("term", "term should be between 1 and 30");
    validForm = false;
  }

  if (
    (!basicValidation("rate", rate) && 0 > Number(rate)) ||
    Number(rate) > 100
  ) {
    displayError("rate", "term should be between 1 and 30");
    validForm = false;
  }

  if (!basicValidation("type")) {
    validForm = false;
  }
  if (validForm == true) {
    calculateAmount(Number(amount), Number(term), Number(rate), type);
  }
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

  document.getElementById("monthly-result").innerHTML =
    monthlypayment.toFixed(2);
  document.getElementById("total-pending").innerHTML = totalPayment.toFixed(2);
  document.getElementById("after-result").classList.remove("hide");
  document.getElementById("before-result").classList.add("hide");
};

const basicValidation = (id, input) => {
  if (id == "type" && input === "") {
    displayError(id, "this field is required");
  }
  if (input !== "") {
    if (isNaN(input)) {
      displayError(id, "This field must be a number");
      return false;
    }
  } else {
    displayError(id, "This field is required");
    return false;
  }

  if (input !== "") {
    if (isNaN(input)) {
      displayError(id, "This field must be a number");
      return false;
    }
  } else {
    displayError(id, "This field is required");
    return false;
  }

  return true;
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

const displayError = (id, message) => {
  const divContainer = document.getElementById(id + "-container");
  if (id !== "type") {
    divContainer.classList.add("error-container");
  }
  divContainer.nextElementSibling.innerHTML = message;
};
