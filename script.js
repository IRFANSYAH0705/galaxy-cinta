// =========================
// ELEMEN WEBSITE
// =========================

const intro = document.getElementById("intro");
const universe = document.getElementById("universe");
const startButton = document.getElementById("startButton");

const stars = document.getElementById("stars");
const planet = document.getElementById("planet");

const galaxyArea = document.getElementById("galaxyArea");
const photoGalaxy = document.getElementById("photoGalaxy");

const letterButton = document.getElementById("letterButton");
const letterOverlay = document.getElementById("letterOverlay");
const closeLetter = document.getElementById("closeLetter");
const finishLetter = document.getElementById("finishLetter");


// =========================
// MEMBUAT BINTANG
// =========================

for (let i = 0; i < 110; i++) {
    const star = document.createElement("span");

    star.className = "star";

    const size = 1 + Math.random() * 2.5;

    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration = 2 + Math.random() * 3 + "s";

    stars.appendChild(star);
}


// =========================
// INTRO
// =========================

startButton.addEventListener("click", function () {
    intro.classList.add("hidden");
    universe.classList.remove("hidden");
});


// =========================
// SURAT RAHASIA
// =========================

function openLetter() {
    letterOverlay.classList.remove("hidden");
}

function hideLetter() {
    letterOverlay.classList.add("hidden");
}

planet.addEventListener("click", openLetter);
letterButton.addEventListener("click", openLetter);

closeLetter.addEventListener("click", hideLetter);
finishLetter.addEventListener("click", hideLetter);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        hideLetter();
    }
});


// =========================
// FOTO GALAKSI
// =========================

// Empat foto asli dipakai secara bergantian.

const fotoGaby = [
    "gaby1.jpeg",
    "gaby2.jpeg",
    "gaby3.jpeg",
    "gaby4.jpeg"
];

// Jumlah foto dapat diubah sesuai kemampuan perangkat.

const jumlahFoto = 64;
const fotoItems = [];

for (let i = 0; i < jumlahFoto; i++) {
    const foto = document.createElement("img");

    foto.src = fotoGaby[i % fotoGaby.length];
    foto.alt = "Foto kenangan Gaby";
    foto.className = "memory-photo";
    foto.draggable = false;
    foto.loading = "eager";

    photoGalaxy.appendChild(foto);

    fotoItems.push({
        element: foto,

        // Posisi setiap foto di sepanjang lintasan.
        angle: (Math.PI * 2 * i) / jumlahFoto,

        // Variasi ukuran.
        size: 0.65 + Math.random() * 0.45,

        // Variasi kecepatan.
        speed: 0.045 + Math.random() * 0.025,

        // Variasi gerakan kecil.
        wave: Math.random() * Math.PI * 2,

        // Variasi kemiringan.
        tilt: (Math.random() - 0.5) * 30
    });
}


// =========================
// INTERAKSI GALAKSI
// =========================

let dragging = false;
let moved = false;
let suppressClick = false;

let activePointer = null;

let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;

let rotationY = 0;
let rotationX = 0;

let velocityX = 0;
let velocityY = 0;


// Mulai menggeser planet.

function startDrag(event) {
    if (event.button !== undefined && event.button !== 0) {
        return;
    }

    dragging = true;
    moved = false;
    activePointer = event.pointerId;

    startX = event.clientX;
    startY = event.clientY;

    lastX = startX;
    lastY = startY;

    velocityX = 0;
    velocityY = 0;

    planet.setPointerCapture(event.pointerId);
}


// Gerakkan galaksi mengikuti tarikan.

function moveDrag(event) {
    if (!dragging || event.pointerId !== activePointer) {
        return;
    }

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;

    if (
        Math.abs(event.clientX - startX) > 5 ||
        Math.abs(event.clientY - startY) > 5
    ) {
        moved = true;
    }

    rotationY += dx * 0.008;
    rotationX += dy * 0.004;

    rotationX = Math.max(-0.45, Math.min(0.45, rotationX));

    velocityX = dx * 0.00015;
    velocityY = dy * 0.0001;

    lastX = event.clientX;
    lastY = event.clientY;
}


// Selesai menggeser.

function endDrag(event) {
    if (!dragging || event.pointerId !== activePointer) {
        return;
    }

    dragging = false;
    activePointer = null;

    if (moved) {
        // Mencegah surat terbuka ketika pengguna selesai menyeret.
        suppressClick = true;

        setTimeout(function () {
            suppressClick = false;
        }, 250);
    }
}

planet.addEventListener("pointerdown", startDrag);
planet.addEventListener("pointermove", moveDrag);
planet.addEventListener("pointerup", endDrag);
planet.addEventListener("pointercancel", endDrag);

// Klik planet membuka surat, tetapi drag tidak.

planet.addEventListener("click", function (event) {
    if (suppressClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}, true);


// =========================
// ANIMASI GALAKSI
// =========================

let animationFrame = 0;
let lastTime = 0;
let time = 0;

function animateGalaxy(timestamp) {
    const delta = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.04)
        : 0;

    lastTime = timestamp;
    time += delta;

    // Galaksi bergerak perlahan secara otomatis.
    if (!dragging) {
        rotationY += 0.035 * delta;

        rotationY += velocityX;
        rotationX += velocityY;

        velocityX *= 0.97;
        velocityY *= 0.97;
    }

    const width = galaxyArea.clientWidth;
    const height = galaxyArea.clientHeight;

    // Mengatur lebar dan tinggi galaksi sesuai layar.
    const radiusX = Math.min(width * 0.43, 490);
    const radiusY = Math.min(height * 0.40, 240);

    fotoItems.forEach(function (item) {
        const angle = item.angle + time * item.speed + rotationY;

        // Posisi horizontal dan vertikal.
        const x = Math.cos(angle) * radiusX;

        const y =
            Math.sin(angle) * radiusY +
            Math.sin(time * 0.6 + item.wave) * 8;

        // Kedalaman foto mengikuti posisi pada lintasan.
        const depth = Math.sin(angle);

        const scale = item.size * (0.65 + (depth + 1) * 0.19);

        const opacity = 0.48 + (depth + 1) * 0.25;

        const tilt =
            item.tilt +
            Math.sin(angle * 1.5 + item.wave) * 8;

        // Foto yang lebih dekat berada di depan.
        const zIndex = Math.round((depth + 1) * 100);

        item.element.style.zIndex = zIndex;
        item.element.style.opacity = opacity;

        item.element.style.transform = `
            translate(-50%, -50%)
            translate3d(${x}px, ${y}px, ${depth * 100}px)
            rotate(${tilt}deg)
            scale(${scale})
        `;
    });

    // Sedikit kemiringan memberikan kesan ruang 3D.
    photoGalaxy.style.transform = `
        rotateX(${rotationX * 25}deg)
    `;

    animationFrame = requestAnimationFrame(animateGalaxy);
}


// Mulai animasi.

function startAnimation() {
    cancelAnimationFrame(animationFrame);

    lastTime = 0;

    animationFrame = requestAnimationFrame(animateGalaxy);
}

startAnimation();


// Menghemat sumber daya ketika tab tidak terlihat.

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        cancelAnimationFrame(animationFrame);
    } else {
        startAnimation();
    }
});
