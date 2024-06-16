/* Validations */
function limitRange(e) {
  if (e.value != "") {
    if (parseInt(e.value) < parseInt(e.min)) {
      e.value = e.min;
      //   alert("You could not enter value under €10,000 !");
    }
    if (parseInt(e.value) > parseInt(e.max)) {
      e.value = e.max;
      //   alert("You could not enter value over €200,000 !");
    }
  }

  calcCost();
}

function calcCost() {
  const carType = document.getElementById("carType");
  const interestRate = document.getElementById("interestRate");
  const leasePeriod = document.getElementById("period");
  const carAmount = document.getElementById("carAmountInput");
  const downPayment = document.getElementById("downPaymentInput");
  const downPaymentField = document.getElementById("downPayment");
  const monthlyInstallment = document.getElementById("pmt");
  const totalCost = document.getElementById("totalCost");

  const interestRateVal = Number(carType.value);
  const leasePeriodVal = Number(leasePeriod.value);
  const downPaymentPerc = Number(downPayment.value);
  const carAmountVal = Number(carAmount.value);

  const downPaymentAmount = (downPaymentPerc / 100) * carAmountVal;
  const sumToBeFinanced = carAmountVal - downPaymentAmount;
  const monthlyInterestRate = interestRateVal / 100 / 12;

  const monthlyInstallmentVal = calculateMonthlyInstallment(
    sumToBeFinanced,
    monthlyInterestRate,
    leasePeriodVal
  );

  const totalCostAmount = calculateTotalCost(
    monthlyInstallmentVal,
    leasePeriodVal,
    downPaymentAmount
  );

  // Prepend currency sign and round numbers
  interestRate.textContent = interestRateVal.toFixed(2) + "%";
  downPaymentField.textContent = "€" + downPaymentAmount.toFixed(2);
  monthlyInstallment.textContent = "€" + monthlyInstallmentVal.toFixed(2);
  totalCost.textContent = "€" + totalCostAmount.toFixed(2);
}

function calculateMonthlyInstallment(
  sumToBeFinanced,
  monthlyInterestRate,
  leasePeriod
) {
  return (
    (sumToBeFinanced *
      monthlyInterestRate *
      (1 + monthlyInterestRate) ** leasePeriod) /
    ((1 + monthlyInterestRate) ** leasePeriod - 1)
  );
}

function calculateTotalCost(monthlyInstallment, leasePeriod, downPayment) {
  return monthlyInstallment * leasePeriod + downPayment;
}
