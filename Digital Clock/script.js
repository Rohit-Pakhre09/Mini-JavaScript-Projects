function clock() {
  let hours = document.getElementById("hrs");
  let minutes = document.getElementById("min");
  let seconds = document.getElementById("sec");
  let amPM = document.getElementById("amPm");
  let today = document.getElementById("day");
  let monthYear = document.getElementById("date_month_year");

  const now = new Date();
  let hrs = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  let amPm = hrs >= 12 ? "PM" : "AM";

  if (hrs == 0) {
    hrs = 12;
  } else if (hrs > 12) {
    hrs = hrs - 12;
  }

  hrs = hrs < 10 ? "0" + hrs : hrs;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  hours.innerText = hrs;
  minutes.innerText = min;
  seconds.innerText = sec;
  amPM.innerText = amPm;

  const day = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const month = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  let dayName = day[now.getDay()];
  let dateNumber = now.getDate();
  let monthName = month[now.getMonth()];
  let yearNumber = now.getFullYear();

  today.innerText = dayName;
  monthYear.innerText = `${dateNumber} ${monthName}, ${yearNumber}`;
}

setInterval(clock, 1000);
clock();