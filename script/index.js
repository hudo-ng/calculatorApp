// @ts-nocheck
const result = document.querySelector(".calculator__display");
let previousValue;
let previousOperator;
let onButtonRightAfterOperator = false;

const numButtons = document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;
    let currentDisplayedValue = result.innerText;
    if (currentDisplayedValue === "0") {
      result.innerText = value;
    } else if (onButtonRightAfterOperator) {
      result.innerText = "" + value;
      onButtonRightAfterOperator = false;
    } else {
      result.innerText = currentDisplayedValue + value;
    }
  });
});

const operatorButtons = document
  .querySelectorAll(".btn__operator")
  .forEach((button) => {
    button.addEventListener("click", () => {
      if (onButtonRightAfterOperator) {
        previousOperator = button.getAttribute("id");
        return;
      } else if (previousValue) {
        let currentValue = result.innerText;
        onButtonRightAfterOperator = true;
        result.innerText = operation(
          previousOperator,
          previousValue,
          currentValue
        );
        previousValue = result.innerText;
      } else {
        previousValue = result.innerText;
        result.innerText = "0";
      }
      previousOperator = button.getAttribute("id");
    });
  });

const equalButton = document
  .querySelector("#equal")
  .addEventListener("click", () => {
    if (previousValue) {
      currentValue = result.innerText;
      result.innerText = operation(
        previousOperator,
        previousValue,
        currentValue
      );
      previousValue = undefined;
      onButtonRightAfterOperator = true;
    }
  });

const cancelButton = document
  .querySelector(".cancel")
  .addEventListener("click", () => {
    result.innerText = "0";
    previousValue = undefined;
    previousOperator = undefined;
    onButtonRightAfterOperator = false;
  });

function operation(operand, operator1, operator2) {
  let result;
  if (operand === "add") {
    result = Number(operator1) + Number(operator2);
  }
  if (operand === "subtract") {
    result = Number(operator1) - Number(operator2);
  }
  if (operand === "multiply") {
    result = Number(operator1) * Number(operator2);
  }
  if (operand === "divide") {
    result = Number(operator1) / Number(operator2);
  }
  return result;
}
