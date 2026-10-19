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

// Membuat bintang di latar belakang.
for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = (2 + Math.random() * 3) + "s";

    const size = 1 + Math.random() * 2;
    star.style.width = size + "px";
    star.style.height = size + "px";

    stars.appendChild(star);
}

// Masuk ke dunia galaksi.
startButton.addEventListener("click", function () {
    intro.classList.add("hidden");
    universe.classList.remove("hidden");
});

// Membuka surat rahasia.
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

// Planet juga bisa dibuka menggunakan keyboard.
planet.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLetter();
    }
});

// Menutup surat dengan tombol Escape.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        hideLetter();
    }
});

// Membuat planet dan galaksi bisa digeser dengan mouse atau jari.
let dragging = false;
let moved = false;

let startX = 0;
let startY = 0;

let rotationX = 0;
let rotationY = 0;

let currentX = 0;
let currentY = 0;

let lastX = 0;
let lastY = 0;

let velocityX = 0;
let velocityY = 0;

let activePointer = null;

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

    rotationY += dx * 0.45;
    rotationX -= dy * 0.25;

    rotationX = Math.max(-30, Math.min(30, rotationX));

    velocityX = dx * 0.35;
    velocityY = dy * 0.2;

    currentX += dx;
    currentY += dy;

    currentX = Math.max(-120, Math.min(120, currentX));
    currentY = Math.max(-70, Math.min(70, currentY));

    lastX = event.clientX;
    lastY = event.clientY;
}

function endDrag(event) {
    if (!dragging || event.pointerId !== activePointer) {
        return;
    }

    dragging = false;
    activePointer = null;

    // Meneruskan gerakan sebentar agar terasa lebih alami.
    if (moved) {
        currentX += velocityX * 5;
        currentY += velocityY * 5;

        currentX = Math.max(-120, Math.min(120, currentX));
        currentY = Math.max(-70, Math.min(70, currentY));
    }
}

planet.addEventListener("pointerdown", startDrag);
planet.addEventListener("pointermove", moveDrag);
planet.addEventListener("pointerup", endDrag);
planet.addEventListener("pointercancel", endDrag);

// Gerakan otomatis galaksi.
let animationFrame = 0;
let angle = 0;

function animateGalaxy() {
    angle += 0.0015;

    if (!dragging) {
        rotationY += velocityX * 0.015;
        rotationX -= velocityY * 0.01;

        velocityX *= 0.96;
        velocityY *= 0.96;
    }

    photoGalaxy.style.transform = `
        translate3d(${currentX}px, ${currentY}px, 0)
        rotateX(${rotationX + Math.sin(angle) * 1.5}deg)
        rotateY(${rotationY + Math.sin(angle * 0.7) * 2}deg)
    `;

    animationFrame = requestAnimationFrame(animateGalaxy);
}

animateGalaxy();

// Menghentikan animasi ketika tab tidak terlihat.
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        cancelAnimationFrame(animationFrame);
    } else {
        cancelAnimationFrame(animationFrame);
        animateGalaxy();
    }
});
