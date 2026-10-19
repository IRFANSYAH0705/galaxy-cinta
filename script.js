// EMPAT SURAT FOTO GABY

const letters = [
    {
        title: "Untuk senyummu 🌷",
        eyebrow: "A LITTLE NOTE FOR YOU",
        paragraphs: [
            "Hai Gaby, ada hal sederhana yang pengin aku bilang. Senyummu itu punya cara sendiri untuk bikin suasana terasa lebih hangat.",
            "Semoga hari-harimu dipenuhi hal baik, orang-orang yang tulus, dan alasan kecil untuk tersenyum. Jangan lupa istirahat dan jaga diri, ya.",
            "Kalau hari ini terasa berat, semoga kamu ingat kalau kamu tetap berharga, bahkan saat kamu sedang tidak merasa baik-baik saja."
        ],
        signoff: "Semoga senyummu selalu punya alasan ♡",
        photo: "gaby1.jpeg"
    },

    {
        title: "Hal kecil tentangmu ✨",
        eyebrow: "THINGS I APPRECIATE",
        paragraphs: [
            "Kadang yang bikin seseorang spesial bukan hal besar, tapi hal-hal kecil yang mungkin dia sendiri tidak sadar.",
            "Cara kamu bercerita, caramu tertawa, dan hal sederhana tentang dirimu bisa membuat hari biasa terasa sedikit lebih menyenangkan.",
            "Aku harap kamu tidak lupa menghargai dirimu sendiri. Kamu tidak harus selalu sempurna untuk pantas disayangi."
        ],
        signoff: "Hal kecil tentangmu tetap berarti 💗",
        photo: "gaby2.jpeg"
    },

    {
        title: "Kamu yang spesial 💗",
        eyebrow: "A GENTLE REMINDER",
        paragraphs: [
            "Gaby, kalau suatu saat kamu merasa kurang percaya diri, coba lihat dirimu dengan lebih lembut. Kamu punya banyak hal baik yang mungkin belum kamu sadari.",
            "Kamu boleh capek, boleh sedih, dan boleh mengambil waktu untuk diri sendiri. Tidak apa-apa kalau semuanya tidak selalu berjalan sesuai rencana.",
            "Aku cuma berharap kamu selalu bertemu alasan untuk bahagia dan orang-orang yang memperlakukanmu dengan baik."
        ],
        signoff: "Kamu spesial dengan caramu sendiri ♡",
        photo: "gaby3.jpeg"
    },

    {
        title: "Satu pesan lagi 🌙",
        eyebrow: "BEFORE YOU GO",
        paragraphs: [
            "Terima kasih sudah menjadi dirimu sendiri, Gaby. Semoga kamu selalu punya keberanian untuk mengejar hal yang kamu inginkan.",
            "Jangan terlalu keras pada diri sendiri, ya. Kamu juga pantas mendapatkan perhatian, ketenangan, dan waktu untuk beristirahat.",
            "Kalau suatu hari kamu membaca surat ini lagi, semoga kamu tersenyum kecil dan ingat bahwa ada pesan baik yang dibuat khusus untukmu."
        ],
        signoff: "Jaga diri baik-baik, Gaby 🌙",
        photo: "gaby4.jpeg"
    }
];


// SURAT KELINCI

const bunnyLetter = {
    title: "Surat rahasia dari kelinci 🐰",
    eyebrow: "A TINY SECRET FOR GABY",
    bunny: true,

    paragraphs: [
        "Hop hop, Gaby! 🐰 Aku kelinci kecil yang datang membawa pesan rahasia untukmu.",
        "Aku punya satu tugas penting: mengingatkan kamu supaya jangan lupa tersenyum, makan dengan baik, istirahat kalau lelah, dan menyayangi diri sendiri.",
        "Kalau hari ini kamu sedih, anggap saja aku sedang mengirim pelukan kelinci paling empuk untukmu. Kalau kamu bahagia, aku ikut melompat-lompat senang! 💗",
        "Terakhir, ada satu rahasia kecil... kamu itu spesial. Jadi jangan terlalu keras kepada dirimu sendiri, ya?",
        "Nah, tugasku selesai! Sekarang aku mau makan wortel sambil menjaga surat ini. Sampai jumpa, Gaby! 🥕💙"
    ],

    signoff: "Hop hop, penuh sayang! 🐰♡"
};


// HALAMAN PEMBUKA

const openingPage = document.getElementById("openingPage");
const mainContent = document.getElementById("mainContent");

document.getElementById("enterButton").addEventListener("click", () => {

    openingPage.classList.add("leaving");

    setTimeout(() => {

        openingPage.hidden = true;
        mainContent.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 650);

});


// ELEMEN SURAT

const modal = document.getElementById("letterModal");
const titleEl = document.getElementById("letterTitle");
const eyebrowEl = document.getElementById("letterEyebrow");
const contentEl = document.getElementById("letterContent");
const symbolEl = document.getElementById("letterSymbol");

const showPhoto = document.getElementById("showPhoto");
const letterPhoto = document.getElementById("letterPhoto");
const hugButton = document.getElementById("hugButton");


// MEMBUKA SURAT

function openLetter(letter) {

    titleEl.textContent = letter.title;
    eyebrowEl.textContent = letter.eyebrow;
    symbolEl.textContent = letter.bunny ? "🐰" : "♡";

    contentEl.replaceChildren();

    letter.paragraphs.forEach((text, index) => {

        const p = document.createElement("p");

        p.textContent = text;
        p.style.animationDelay = `${index * 0.12}s`;

        contentEl.appendChild(p);

    });

    const signoff = document.createElement("p");

    signoff.className = "letter-signoff";
    signoff.textContent = letter.signoff;

    contentEl.appendChild(signoff);

    showPhoto.hidden = !letter.photo;
    letterPhoto.hidden = true;
    showPhoto.disabled = false;
    showPhoto.textContent = "Lihat foto kecil 💗";

    hugButton.hidden = !letter.bunny;

    if (letter.photo) {
        letterPhoto.src = letter.photo;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


// KLIK EMPAT KARTU FOTO

document.querySelectorAll("[data-letter]").forEach(card => {

    card.addEventListener("click", () => {

        const index = Number(card.dataset.letter);

        openLetter(letters[index]);

    });

});


// KLIK SURAT KELINCI

document.getElementById("bunnyButton").addEventListener("click", () => {

    openLetter(bunnyLetter);

});


// TAMPILKAN FOTO

showPhoto.addEventListener("click", () => {

    letterPhoto.hidden = false;
    showPhoto.disabled = true;
    showPhoto.textContent = "Foto kecil untukmu 💗";

});


// TUTUP SURAT

function closeLetter() {

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}

document.getElementById("closeLetter").addEventListener("click", closeLetter);

document.getElementById("modalBackground").addEventListener("click", closeLetter);


// MEMULAI ADEGAN PELUKAN

const hugScene = document.getElementById("hugScene");

hugButton.addEventListener("click", () => {

    closeLetter();

    hugScene.classList.add("show");
    hugScene.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    // Mulai gerakan karakter setelah adegan terbuka.

    setTimeout(() => {

        hugScene.classList.add("hugging");

        createHugHearts();

    }, 350);

});


// MENUTUP ADEGAN PELUKAN

document.getElementById("closeHug").addEventListener("click", () => {

    hugScene.classList.remove("show", "hugging");

    hugScene.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

});


// TOMBOL ESC

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeLetter();

        hugScene.classList.remove("show", "hugging");

        hugScene.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }

});


// HATI BERTERBANGAN

function createHugHearts() {

    const holder = document.getElementById("hugHearts");

    holder.replaceChildren();

    for (let i = 0; i < 24; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent = ["♡", "♥", "✦", "💕"][i % 4];

        heart.style.left = `${Math.random() * 100}%`;

        heart.style.animationDelay = `${Math.random() * 3}s`;

        heart.style.fontSize = `${14 + Math.random() * 20}px`;

        holder.appendChild(heart);

    }

}


// BINTANG DAN METEOR GALAKSI UTAMA

const starCanvas = document.getElementById("stars");
const starCtx = starCanvas.getContext("2d");

const meteorCanvas = document.getElementById("meteors");
const meteorCtx = meteorCanvas.getContext("2d");

let stars = [];
let meteors = [];

let width = 0;
let height = 0;
let lastMeteor = 0;


function resizeCanvas(canvas, ctx) {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}


function resizeSpace() {

    width = window.innerWidth;
    height = window.innerHeight;

    resizeCanvas(starCanvas, starCtx);
    resizeCanvas(meteorCanvas, meteorCtx);

    stars = Array.from({
        length: Math.min(180, Math.floor(width * height / 6500))
    }, () => ({

        x: Math.random() * width,
        y: Math.random() * height,

        radius: Math.random() * 1.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.002 + 0.0005

    }));

}


function addMeteor() {

    meteors.push({

        x: Math.random() * width,
        y: -20,

        vx: -(3 + Math.random() * 4),
        vy: 3 + Math.random() * 2,

        life: 0,
        maxLife: 65,

        length: 90 + Math.random() * 80

    });

}


function animateSpace(time) {

    starCtx.clearRect(0, 0, width, height);

    stars.forEach(star => {

        const glow = 0.35 + Math.sin(
            time * star.speed + star.phase
        ) * 0.35;

        starCtx.beginPath();

        starCtx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        starCtx.fillStyle = `rgba(225,230,255,${glow + 0.25})`;

        starCtx.fill();

    });


    meteorCtx.clearRect(0, 0, width, height);

    if (time - lastMeteor > 2200 + Math.random() * 2400) {

        addMeteor();

        lastMeteor = time;

    }

    meteors = meteors.filter(m => m.life < m.maxLife);

    meteors.forEach(m => {

        m.x += m.vx;
        m.y += m.vy;
        m.life++;

        const alpha = Math.sin(Math.PI * m.life / m.maxLife);

        const gradient = meteorCtx.createLinearGradient(
            m.x,
            m.y,
            m.x + m.length,
            m.y - m.length
        );

        gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
        gradient.addColorStop(1, "rgba(170,140,255,0)");

        meteorCtx.strokeStyle = gradient;
        meteorCtx.lineWidth = 2;

        meteorCtx.beginPath();
        meteorCtx.moveTo(m.x, m.y);
        meteorCtx.lineTo(m.x + m.length, m.y - m.length);
        meteorCtx.stroke();

    });

    requestAnimationFrame(animateSpace);

}


// BINTANG KHUSUS ADEGAN PELUKAN

const hugCanvas = document.getElementById("hugStars");
const hugCtx = hugCanvas.getContext("2d");

let hugStars = [];

function resizeHugStars() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    hugCanvas.width = window.innerWidth * dpr;
    hugCanvas.height = window.innerHeight * dpr;

    hugCanvas.style.width = `${window.innerWidth}px`;
    hugCanvas.style.height = `${window.innerHeight}px`;

    hugCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    hugStars = Array.from({ length: 130 }, () => ({

        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,

        radius: Math.random() * 1.8 + 0.3,
        phase: Math.random() * Math.PI * 2

    }));

}


function animateHugStars(time) {

    hugCtx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    hugStars.forEach(star => {

        const glow = .35 + Math.sin(
            time * .0015 + star.phase
        ) * .4;

        hugCtx.beginPath();

        hugCtx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        hugCtx.fillStyle =
            `rgba(255,220,255,${Math.max(.1, glow)})`;

        hugCtx.fill();

    });

    requestAnimationFrame(animateHugStars);

}


// JALANKAN SEMUA ANIMASI

window.addEventListener("resize", () => {

    resizeSpace();
    resizeHugStars();

});

resizeSpace();
resizeHugStars();

requestAnimationFrame(animateSpace);
requestAnimationFrame(animateHugStars);
