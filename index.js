const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = form.elements["amount"].value;
  const term = form.elements["term"].value;
  const rate = form.elements["rate"].value;
  const type = form.elements["type"].value;

  if (!basicValidation("amount", amount)) {
    return;
  }

  if (!basicValidation("term", term) || 0 > Number(term) || Number(term) > 31) {
    displayError("term", "term should be between 1 and 30");
    return;
  }

  if (
    !basicValidation("rate", rate) ||
    0 > Number(rate) ||
    Number(rate) > 100
  ) {
    displayError("rate", "term should be between 1 and 30");
    return;
  }

  calculateAmount(Number(amount), Number(term), Number(rate), type);
});

const calculateAmount = (amount, term, rate, type) => {
  const numOfPayments = term * 12;
  const monthlyrate = rate / 100 / 12;

  const monthlypayment =
    amount *
    monthlyrate *
    (Math.pow(1 + monthlyrate, numOfPayments) /
      (Math.pow(1 + monthlyrate, numOfPayments) - 1));
  const totalPayment = monthlypayment * numOfPayments;
  document.getElementById("monthly-result").innerHTML =
    monthlypayment.toFixed(2);
  document.getElementById("total-pending").innerHTML = totalPayment.toFixed(2);
};

const basicValidation = (id, number) => {
  if (number !== "") {
    if (isNaN(number)) {
      displayError(id, "this field must be a number");
      return false;
    }
  } else {
    displayError(id, "this field is required");
    return false;
  }

  if (number !== "") {
    if (isNaN(number)) {
      displayError(id, "this field must be a number");
      return false;
    }
  } else {
    displayError(id, "this field is required");
    return false;
  }

  return true;
};

const displayError = (id, message) => {
  console.log(id, message);
};
