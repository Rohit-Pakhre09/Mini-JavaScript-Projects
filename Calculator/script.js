const display = document.getElementById("display");

function appendToDisplay(value) {
  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/", "."];

  if (operators.includes(value) && operators.includes(lastChar)) return;

  if (value === "%") {
    if (display.value !== "") {
      display.value = (parseFloat(display.value) / 100).toString();
    }
  } else {
    display.value += value;
  }
}

function calculate() {
  try {
    if (display.value.trim() !== "") {
      display.value = eval(display.value);
    }
  } catch {
    display.value = "Error";
  }
}

function reset() {
  display.value = "";
}

function clearEntry() {
  display.value = display.value.slice(0, -1);
}

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "%"].includes(key)) {
    appendToDisplay(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    clearEntry();
  } else if (key === "Escape") {
    reset();
  }
});
