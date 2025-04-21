const display = document.getElementById("display");
const buttons = document.getElementsByTagName("button");

let currentInput = "0";
let previousInput = "0";
let operator = "";
let justEvaluated = false;
const acceptedkeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "*",
  "/",
  "+",
  "-",
  "%",
  "Enter",
  "Backspace",
];
for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  button.addEventListener("click", function () {
    const value = button.textContent;
    handleValueEvent(value);
  });
}

function handleValueEvent(value) {
  switch (value) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (currentInput === "0" || justEvaluated) {
        currentInput = value;
      } else {
        currentInput = `${currentInput}${value}`;
      }
      updateDisplay();
      break;

    case ".":
      if (!currentInput.includes(".")) {
        currentInput += value;
        updateDisplay();
      }
      break;

    case "+":
    case "-":
    case "x":
    case "÷":
      calculateOrReAssign(value);
      break;

    case "%":
      currentInput = String(parseFloat(currentInput) / 100);
      updateDisplay();
      break;

    case "+/-":
      currentInput = (-parseFloat(currentInput)).toString();
      updateDisplay();
      break;

    case "AC":
      0;
      operator = "";
      previousInput = "";
      currentInput = "0";
      updateDisplay();
      break;

    case "=":
      if (!currentInput || !previousInput || !operator) {
        return;
      }
      calculate();
      updateDisplay();
      previousInput = "";
      operator = "";
      justEvaluated = true;
      break;
  }
}

document.addEventListener("keydown", function (event) {
  let currenPressKey = event.key;
  if (acceptedkeys.includes(currenPressKey)) {
    if (currenPressKey === "Enter") {
      currenPressKey = "=";
    }
    if (currenPressKey === "*") {
      currenPressKey = "x";
    }
    if (currenPressKey === "/") {
      currenPressKey = "÷";
    }
    if (currenPressKey === "Backspace") {
      currenPressKey = "AC";
    }
    handleValueEvent(currenPressKey);
  }
});

function calculateOrReAssign(value) {
  if (operator && previousInput) {
    calculate();
  }

  operator = value === "x" ? "*" : value === "÷" ? "/" : value;
  previousInput = currentInput;
  currentInput = "0";
}

function calculate() {
  try {
    const result = eval(
      `${parseFloat(previousInput)} ${operator} ${parseFloat(currentInput)}`
    );
    currentInput = String(Math.round(result * 1e10) / 1e10);
  } catch (e) {
    currentInput = "Error";
  }
}

function updateDisplay() {
  display.value = currentInput;
}
