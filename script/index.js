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
      if (previousValue) {
        let currentValue = result.innerText;
        onButtonRightAfterOperator = true;
        if (previousOperator === "add") {
          result.innerText = Number(previousValue) + Number(currentValue);
        }
        if (previousOperator === "subtract") {
          result.innerText = Number(previousValue) - Number(currentValue);
        }
        if (previousOperator === "multiply") {
          result.innerText = Number(previousValue) * Number(currentValue);
        }
        if (previousOperator === "divide") {
          result.innerText = Number(previousValue) / Number(currentValue);
        }
        previousValue = result.innerText;
        previousOperator = button.getAttribute("id");
      } else {
        previousValue = result.innerText;
        previousOperator = button.getAttribute("id");
        result.innerText = "0";
      }
    });
  });

const cancelButton = document
  .querySelector(".cancel")
  .addEventListener("click", () => {
    result.innerText = "0";
    previousValue = undefined;
  });
