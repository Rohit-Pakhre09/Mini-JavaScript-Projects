const add = document.querySelector(".add");
const inputField = document.getElementById("input");
const hr = document.getElementById("hr");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const msg = document.getElementById("guide-msg");
const inputpattern = /^[0-9]+$/;

function convertor(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  hr.innerHTML = `${hours} hrs`;
  min.innerHTML = `${minutes} min`;
  sec.innerHTML = `${seconds} sec`;
}

add.addEventListener("click", () => {
  const input = inputField.value.trim();

  if (!input) {
    msg.innerText = "Input field is empty.";
    return;
  } else if (!inputpattern.test(input)) {
    msg.innerText = "Input field should contain only numbers.";
    return;
  } else {
    msg.innerText = "";
  }

  const totalSeconds = parseInt(input);
  convertor(totalSeconds);
  inputField.value = "";
});

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const input = inputField.value.trim();

    if (!input) {
      msg.innerText = "Input field is empty.";
      return;
    } else if (!inputpattern.test(input)) {
      msg.innerText = "Input field should contain only numbers.";
      return;
    } else {
      msg.innerText = "";
    }

    const totalSeconds = parseInt(input);
    convertor(totalSeconds);
    inputField.value = "";
  }
});