let quotes = document.getElementById("quotes");
let author = document.getElementById("author");
let change = document.getElementById("change");
let copy = document.getElementById("copy");
let like = document.getElementById("like");
let isLiked = false;

const apiUrl = 'https://dummyjson.com/quotes';

function showQuote() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.quotes.length);
            const selectedQuote = data.quotes[randomIndex];
            quotes.textContent = `"${selectedQuote.quote}"`;
            author.textContent = `~ ${selectedQuote.author}`;
        })
        .catch(err => {
            quotes.textContent = "Failed to load quote.";
            console.error(err);
        });
};

function copyQuote() {
    let quoteText = `${quotes.textContent} by ${author.textContent}`;

    navigator.clipboard.writeText(quoteText)
        .then(() => {
            copy.innerHTML = '<i class="fa-solid fa-circle-check" style="margin-right: 10px; font-size: 20px;"></i> Copied!';
            copy.style.color = "green";

            setTimeout(() => {
                copy.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
                copy.style.color = "white";
            }, 2000);
        })
        .catch(() => {
            copy.innerHTML = '<i class="fa-solid fa-circle-xmark" style="margin-right: 10px; font-size: 20px;"></i> Failed!';
            copy.style.color = "red";

            setTimeout(() => {
                copy.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
                copy.style.color = "white";
            }, 2000);
        });
}

like.addEventListener("click", () => {
    isLiked = !isLiked;

    if (!isLiked) {
        like.classList.remove("fa-regular");
        like.classList.add("fa-solid");
        like.style.color = "red";
    } else {
        like.classList.remove("fa-solid");
        like.classList.add("fa-regular");
        like.style.color = "black";
    }
});

whatsapp.addEventListener("click", () => {
    const quoteText = `${quotes.textContent} by ${author.textContent}`;
    const encodedText = encodeURIComponent(quoteText);

    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
});


copy.addEventListener("click", copyQuote);

change.addEventListener("click", () => {
    change.textContent = "Next";
    showQuote();
});

showQuote();
