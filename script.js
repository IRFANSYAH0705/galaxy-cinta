// =========================
// MENGAMBIL ELEMEN
// =========================

const starsCanvas = document.getElementById("stars");
const galaxyCanvas = document.getElementById("galaxy");

const starsCtx = starsCanvas.getContext("2d");
const galaxyCtx = galaxyCanvas.getContext("2d");

const planet = document.getElementById("planet");
const openSecret = document.getElementById("openSecret");

const overlay = document.getElementById("overlay");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");

const readLetter = document.getElementById("readLetter");

const closeEnvelope = document.getElementById("closeEnvelope");
const closeLetter = document.getElementById("closeLetter");

const hugButton = document.getElementById("hugButton");
const hugMessage = document.getElementById("hugMessage");

// =========================
// PENGATURAN GALAKSI
// =========================

let width = window.innerWidth;
let height = window.innerHeight;

let pixelRatio = Math.min(
    window.devicePixelRatio || 1,
    1.5
);

let stars = [];
let photos = [];

let angle = 0;
let lastTime = 0;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// =========================
// MEMUAT FOTO GABY
// =========================

const photoFiles = [
    "gaby1.jpeg",
    "gaby2.jpeg",
    "gaby3.jpeg",
    "gaby4.jpeg"
];

function loadPhotos() {
    const promises = photoFiles.map((file) => {
        return new Promise((resolve) => {
            const img = new Image();

            img.onload = () => {
                photos.push(img);
                resolve();
            };

            img.onerror = () => {
                console.error("Foto tidak ditemukan:", file);
                resolve();
            };

            img.src = file;
        });
    });

    return Promise.all(promises);
}

// =========================
// MENGATUR UKURAN CANVAS
// =========================

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        1.5
    );

    [starsCanvas, galaxyCanvas].forEach((canvas) => {
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
    });

    starsCtx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );

    galaxyCtx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );

    createStars();
}

window.addEventListener("resize", resizeCanvas);

// =========================
// MEMBUAT BINTANG
// =========================

function createStars() {
    stars = [];

    const count = Math.min(
        220,
        Math.floor(width * height / 3000)
    );

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,

            size: Math.random() * 1.5 + 0.2,

            alpha: Math.random() * 0.7 + 0.2,

            phase: Math.random() * Math.PI * 2,

            speed: Math.random() * 1.5 + 0.3
        });
    }
}

// =========================
// MENGGAMBAR BINTANG
// =========================

function drawStars(delta) {
    starsCtx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
        if (!reducedMotion) {
            star.phase += delta * 0.001 * star.speed;
        }

        const alpha = reducedMotion
            ? star.alpha
            : star.alpha * (
                0.65 + Math.sin(star.phase) * 0.35
            );

        starsCtx.beginPath();

        starsCtx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        starsCtx.fillStyle =
            `rgba(255, 255, 255, ${alpha})`;

        starsCtx.fill();
    });
}

// =========================
// MEMBUAT POSISI FOTO
// =========================

function createPhotoPositions() {
    return photos.map((img, index) => {
        return {
            img,

            angle: (
                index / photos.length
            ) * Math.PI * 2,

            radius: 65 + Math.random() * 65,

            size: 35 + Math.random() * 15,

            phase: Math.random() * Math.PI * 2
        };
    });
}

// =========================
// MENGGAMBAR FOTO GALAKSI
// =========================

function drawGalaxy(delta) {
    galaxyCtx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height * 0.70;

    const glow = galaxyCtx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, height) * 0.55
    );

    glow.addColorStop(
        0,
        "rgba(139, 62, 184, 0.20)"
    );

    glow.addColorStop(
        0.5,
        "rgba(80, 35, 110, 0.09)"
    );

    glow.addColorStop(
        1,
        "rgba(0, 0, 0, 0)"
    );

    galaxyCtx.fillStyle = glow;

    galaxyCtx.fillRect(
        0,
        0,
        width,
        height
    );

    if (photos.length === 0) {
        return;
    }

    if (!reducedMotion) {
        angle += delta * 0.00008;
    }

    const count = window.innerWidth < 600 ? 90 : 150;

    for (let i = 0; i < count; i++) {
        const photo = photos[i % photos.length];

        const spiralAngle =
            i * 2.399963 + angle;

        const radius =
            Math.sqrt(i / count) *
            Math.min(width * 0.65, height * 0.85);

        const x =
            centerX +
            Math.cos(spiralAngle) * radius;

        const y =
            centerY +
            Math.sin(spiralAngle) * radius * 0.35;

        const perspective =
            0.45 + (
                1 - radius / (
                    Math.min(width * 0.65, height * 0.85) || 1
                )
            ) * 0.55;

        const size = (
            18 + (i % 4) * 5
        ) * perspective;

        if (
            x < -size ||
            x > width + size ||
            y < -size ||
            y > height + size
        ) {
            continue;
        }

        galaxyCtx.save();

        galaxyCtx.globalAlpha = 0.65 + perspective * 0.35;

        galaxyCtx.fillStyle = "#fff8fc";

        galaxyCtx.fillRect(
            x - size / 2 - 2,
            y - size / 2 - 2,
            size + 4,
            size + 4
        );

        galaxyCtx.drawImage(
            photo,
            x - size / 2,
            y - size / 2,
            size,
            size
        );

        galaxyCtx.restore();
    }
}

// =========================
// LOOP ANIMASI
// =========================

function animate(timestamp) {
    if (!lastTime) {
        lastTime = timestamp;
    }

    const delta = Math.min(
        timestamp - lastTime,
        40
    );

    lastTime = timestamp;

    drawStars(delta);
    drawGalaxy(delta);

    requestAnimationFrame(animate);
}

// =========================
// MEMBUKA SURAT
// =========================

function showEnvelope() {
    overlay.classList.add("show");

    envelope.classList.add("show");
    letter.classList.remove("show");

    document.body.style.overflow = "hidden";

    closeEnvelope.focus();
}

function showLetter() {
    envelope.classList.remove("show");

    letter.classList.add("show");

    hugMessage.classList.remove("show");

    letter.scrollTop = 0;

    closeLetter.focus();
}

function closeSecret() {
    envelope.classList.remove("show");
    letter.classList.remove("show");

    overlay.classList.remove("show");

    document.body.style.overflow = "";

    planet.focus();
}

// =========================
// TOMBOL INTERAKSI
// =========================

planet.addEventListener("click", showEnvelope);

openSecret.addEventListener("click", showEnvelope);

readLetter.addEventListener("click", showLetter);

closeEnvelope.addEventListener("click", closeSecret);

closeLetter.addEventListener("click", closeSecret);

overlay.addEventListener("click", closeSecret);

// Menutup surat menggunakan tombol Escape.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSecret();
    }
});

// =========================
// EFEK PELUK
// =========================

function createHearts() {
    const heartSymbols = ["❤️", "💗", "💕", "💖", "💘"];

    for (let i = 0; i < 24; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent =
            heartSymbols[
                Math.floor(Math.random() * heartSymbols.length)
            ];

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize =
            14 + Math.random() * 18 + "px";

        heart.style.animationDelay =
            Math.random() * 1.2 + "s";

        document.body.appendChild(heart);

        heart.addEventListener("animationend", () => {
            heart.remove();
        });
    }
}

hugButton.addEventListener("click", () => {
    hugMessage.classList.add("show");

    hugButton.textContent = "Peluknya sudah sampai ❤️";

    createHearts();
});

// =========================
// MEMULAI GALAKSI
// =========================

async function startGalaxy() {
    resizeCanvas();

    await loadPhotos();

    photos = photos.filter(
        (img) => img.complete && img.naturalWidth > 0
    );

    requestAnimationFrame(animate);

    if (photos.length === 0) {
        console.error(
            "Foto Gaby tidak berhasil dimuat. Periksa nama file."
        );
    }
}

startGalaxy();
