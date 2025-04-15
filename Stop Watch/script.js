let hours = document.getElementById("hrs");
let minutes = document.getElementById("min");
let seconds = document.getElementById("secs");
let milliseconds = document.getElementById("millisec");

let stopEl = document.getElementById("stop");
let playEl = document.getElementById("play");
let resetEl = document.getElementById("reset");

let hr = 0;
let min = 0;
let sec = 0;
let ms = 0;

let stopId;
let isRunning = false;

function playWatch() {
    ms++;
    if (ms === 100) {
        ms = 0;
        sec++;
        if (sec === 60) {
            sec = 0;
            min++;
        }
        if (min === 60) {
            min = 0;
            hr++;
        }
    }

    hours.textContent = (hr < 10) ? "0" + hr : hr;
    minutes.textContent = (min < 10) ? "0" + min : min;
    seconds.textContent = (sec < 10) ? "0" + sec : sec;
    milliseconds.textContent = (ms < 10) ? "0" + ms : ms;
}

function reset() {
    clearInterval(stopId);
    isRunning = false;
    hr = 0;
    min = 0;
    sec = 0;
    ms = 0;
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    milliseconds.textContent = "00";
}

function pause() {
    clearInterval(stopId);
    isRunning = false;
}

function startWatch() {
    if (!isRunning) {
        stopId = setInterval(playWatch, 10);
        isRunning = true;
    }
}

stopEl.addEventListener('click', pause);
playEl.addEventListener('click', startWatch);
resetEl.addEventListener('click', reset);