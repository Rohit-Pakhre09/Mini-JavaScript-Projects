const songDetailIcon = document.querySelector(".bi-music-note");
const lyricsIcon = document.querySelector(".bi-soundwave");
const songName = document.getElementById("songName");
const lyricsContainer = document.getElementById("lyrics");
const spotify = document.getElementById("spotify");
const start = document.getElementById("start");
const progress = document.getElementById("range");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");

let timer = null;
let isSeeking = false;

const songLyrics = {
    song: `Lyrics<br><br>Check, ay
Bole ek khokha do (aye)
Haan, do khokha chaar (chaar)
20 kaali gaadi, 100 bande mere saath
On a low (on a low) karna 100 milli paar
Ek milli, do milli, teen milli, chaar aane do (aye)
Ye hote pareshaan
Chalta mere naam jaise chalta mera kaam, aane do
Ek khokha, do khokha, teen khokha, chaar (chal, dekh, dekh, dekh)
Oh, kal si Dubai naal sheikh vi si kayi
Ohdo baad main Colombia flight fadli
Jithe jaavan uthe yaar hi kamaaye jatt ne
Tenu lagda ki paise di kamaai kar layi
Chaal jatt di slow (aye) mainu dekho gaur naal
Kalla-kalla putt ture taraan taur naal
Yeah, they know (yeah, they know) meri kithe tak maar
Ankh'an vicho padh lavaan banda mile saath
Mange jhaanjhra di jodi, ehiyo masla
Ghodi mangdi badam'an aala tasla
Maada manga na swaad na swadiyaan
Assi rotiyaan achaaraan dei aadiyan
Gaddi meri low, modde high har vaar
Jithe jaavan naal vadda bhai har vaar
Yeah, they know (yeah, they know) meri kithe tak maar
Ankh'an vich'on padh lavaan banda mile saath
Bole ek khokha do (aye) haan, do khokha chaar (chaar)
20 kaali gaadi, 100 bande mere saath
On a low (on a low) karna 100 milli paar
Ek milli, do milli, teen milli, chaar aane do
Haan, khule mein foonkana, kiya six mein landing
Ganji kaala rakhte, all black forces matchin'
Music pehla rakhte, humse na hota actin' (haan)
Hum paisa udaate, phir ab bolte fashion (haan)
Hum sahi mein hood se jaise ghar mein rashion
Tere baap ke belt sa, har ab verse hai slappin'
Extra daant hai tujhmein isliye karta cappin'
Hum gaadi udaate, south film ki action
Kabhi khaoon gully, kabhi chakhte hum Baskin (aye)
Na kiya shadi shows, phir bhi bohot hai cash in
Brother, what's really crackin'? Hum jaise hum fly
Patiala with Manala, hum hain vaise bhi high (aye)
Aushidhi mein yahaan udhte videshi dawai
Main vo gehra bura sapna hoon jo tujhe sataye
Tujhe pata hai, bhai (aye) tu kitna paani mein (aye)
Haan, dickie ke alava bhi samaan hota gaadi mein
Har din yahaan Diwali hai (Diwali)
Haan, gehra naala tere neeche
Sabko pata hai tu jaali hai
Hum paise bhi kama liye
10 khokha, 20 khokha, 30 khokha
50 khokha, 100 khokha, 200-300 khokha
500 khokha, chal, gin-gin-gin
Hum paise bhi kama liye, tu to jaali hai
Bole ek khokha do, haan, do khokha chaar.<br><br><br><br><br><br>`
};

const songDetails = `
    <h3>Song Details:</h3><br>
    <p><strong>Song Name:</strong> 100 Million</p>
    <p><strong>Artists:</strong> Divine & Karan Aujla</p>
    <p><strong>Producers:</strong> Divine, Nucleya</p>
    <p><strong>Album:</strong> 100 Million (Single)</p>
    <p><strong>Release Date:</strong> 2020</p>
    <p><strong>Genre:</strong> Hip Hop, Rap</p>
`;

function formatTime(time) {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

function updateTimeAndProgress() {
    if (!song.paused && !isSeeking) {
        start.textContent = formatTime(song.currentTime);
        progress.value = song.currentTime;
        if (song.ended) {
            clearInterval(timer);
            controlIcon.classList.remove("bi-pause-fill");
            controlIcon.classList.add("bi-play-fill");
            start.textContent = "00:00";
            progress.value = 0;
        }
    }
}

function playPause() {
    if (song.paused) {
        song.play();
        controlIcon.classList.remove("bi-play-fill");
        controlIcon.classList.add("bi-pause-fill");
        timer = setInterval(updateTimeAndProgress, 500);
    } else {
        song.pause();
        controlIcon.classList.remove("bi-pause-fill");
        controlIcon.classList.add("bi-play-fill");
        clearInterval(timer);
    }
}

document.getElementById("reverse").addEventListener("click", () => {
    if (!isNaN(song.duration)) {
        song.currentTime = Math.max(0, song.currentTime - 10);
        updateTimeAndProgress();
    }
});

document.getElementById("next").addEventListener("click", () => {
    if (!isNaN(song.duration)) {
        song.currentTime = Math.min(song.duration, song.currentTime + 10);
        updateTimeAndProgress();
    }
});

progress.addEventListener("input", () => {
    isSeeking = true;
    song.currentTime = progress.value;
    start.textContent = formatTime(song.currentTime);
});

progress.addEventListener("change", () => {
    isSeeking = false;
    if (song.paused) {
        song.play();
        controlIcon.classList.remove("bi-play-fill");
        controlIcon.classList.add("bi-pause-fill");
        timer = setInterval(updateTimeAndProgress, 500);
    }
});

song.addEventListener("loadedmetadata", () => {
    progress.max = song.duration;
    start.textContent = formatTime(0);
});

lyricsIcon.addEventListener("click", () => {
    const isVisible = lyricsContainer.style.display === "block";
    if (!isVisible) {
        lyricsContainer.innerHTML = songLyrics.song;
    }
    lyricsContainer.style.display = isVisible ? "none" : "block";
    songName.style.display = isVisible ? "block" : "none";
    spotify.style.display = isVisible ? "block" : "none";
});

let isDetailsShown = false;
songDetailIcon.addEventListener("click", () => {
    isDetailsShown = !isDetailsShown;
    if (isDetailsShown) {
        lyricsContainer.innerHTML = songDetails;
        lyricsContainer.style.display = "block";
        songName.style.display = "none";
        spotify.style.display = "none";
    } else {
        lyricsContainer.style.display = "none";
        songName.style.display = "block";
        spotify.style.display = "block";
    }
});