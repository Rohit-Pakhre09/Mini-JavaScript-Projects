let toasts = document.getElementById("toasts");

let successMsg = '<i class="fa-solid fa-circle-check"></i> Successfully Done!';
let errorMsg = '<i class="fa-solid fa-circle-xmark"></i> Error. Try again!';
let invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i> Invalid Input, Check again once!';

function showToasts(msg) {
    let toastBox = document.createElement("div");
    toastBox.classList.add("toast");
    toastBox.innerHTML = msg;
    toasts.append(toastBox);

    if (msg.includes("Error")) {
        toastBox.classList.add("error")
    };

    if (msg.includes("Invalid")) {
        toastBox.classList.add("invalid")
    };

    setTimeout(() => {
        toastBox.remove();
    }, 5000);
}