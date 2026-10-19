/* ==============================
   ELEMEN WEBSITE
============================== */

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");
const mainContent = document.getElementById("mainContent");

const galaxy = document.getElementById("galaxy");
const planet = document.getElementById("planet");
const photoOrbit = document.getElementById("photoOrbit");

const letterButton = document.getElementById("letterButton");
const bottomLetterButton = document.getElementById("bottomLetterButton");

const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");

const photoModal = document.getElementById("photoModal");
const closePhoto = document.getElementById("closePhoto");

const previewImage = document.getElementById("previewImage");
const previewCaption = document.getElementById("previewCaption");

const starCanvas = document.getElementById("starCanvas");
const starContext = starCanvas.getContext("2d");

const shootingStars = document.getElementById("shootingStars");

const photoCards = Array.from(
    document.querySelectorAll(".photo-card")
);


/* ==============================
   INTRO DAN HALAMAN UTAMA
============================== */

let hasEntered = false;

enterButton.addEventListener("click", function () {

    if (hasEntered) {
        return;
    }

    hasEntered = true;

    intro.classList.add("hide");
    mainContent.classList.add("show");

    setTimeout(function () {
        intro.style.display = "none";
    }, 950);

});


/* ==============================
   BINTANG DI LATAR BELAKANG
============================== */

let stars = [];

let canvasWidth = 0;
let canvasHeight = 0;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


function resizeCanvas() {

    const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    starCanvas.width = Math.floor(
        canvasWidth * pixelRatio
    );

    starCanvas.height = Math.floor(
        canvasHeight * pixelRatio
    );

    starCanvas.style.width = canvasWidth + "px";
    starCanvas.style.height = canvasHeight + "px";

    starContext.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );

    createStars();

}


function createStars() {

    stars = [];

    const totalStars = Math.min(
        180,
        Math.floor(
            (canvasWidth * canvasHeight) / 6500
        )
    );

    for (let i = 0; i < totalStars; i++) {

        stars.push({

            x: Math.random() * canvasWidth,

            y: Math.random() * canvasHeight,

            radius: Math.random() * 1.5 + 0.3,

            opacity: Math.random() * 0.7 + 0.2,

            speed: Math.random() * 0.008 + 0.002,

            phase: Math.random() * Math.PI * 2

        });

    }

}


let animationTime = 0;


function drawStars() {

    starContext.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );

    animationTime += reducedMotion ? 0 : 0.016;

    for (const star of stars) {

        let opacity = star.opacity;

        if (!reducedMotion) {

            opacity =
                star.opacity *
                (
                    0.65 +
                    0.35 *
                    Math.sin(
                        animationTime * star.speed * 50 +
                        star.phase
                    )
                );

        }

        starContext.beginPath();

        starContext.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        starContext.fillStyle =
            "rgba(255, 245, 255, " + opacity + ")";

        starContext.shadowBlur =
            star.radius > 1.2 ? 8 : 2;

        starContext.shadowColor = "#e5c7ff";

        starContext.fill();

    }

    starContext.shadowBlur = 0;

    requestAnimationFrame(drawStars);

}


window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawStars();


/* ==============================
   BINTANG JATUH
============================== */

function createShootingStar() {

    if (reducedMotion) {
        return;
    }

    const star = document.createElement("div");

    star.className = "shooting-star";

    star.style.left =
        (Math.random() * window.innerWidth * 0.9 + 5) +
        "px";

    star.style.top =
        (Math.random() * window.innerHeight * 0.45) +
        "px";

    shootingStars.appendChild(star);

    star.addEventListener("animationend", function () {
        star.remove();
    });

}


function scheduleShootingStar() {

    const delay = 1800 + Math.random() * 3500;

    setTimeout(function () {

        createShootingStar();

        scheduleShootingStar();

    }, delay);

}


scheduleShootingStar();


/* ==============================
   FOTO MENGELILINGI PLANET
============================== */

let orbitAngle = 0;

let orbitSpeed = 0.00022;

let isDragging = false;

let lastPointerX = 0;

let lastPointerY = 0;

let dragDistance = 0;

let lastInteractionTime = 0;


const photoSettings = [

    {
        angle: -145,
        radiusX: 0.31,
        radiusY: 0.25,
        depth: 0.1,
        tilt: -12
    },

    {
        angle: -45,
        radiusX: 0.38,
        radiusY: 0.35,
        depth: 0.7,
        tilt: 9
    },

    {
        angle: 45,
        radiusX: 0.31,
        radiusY: 0.25,
        depth: 0.9,
        tilt: -7
    },

    {
        angle: 145,
        radiusX: 0.38,
        radiusY: 0.35,
        depth: 0.2,
        tilt: 12
    }

];


function getOrbitDimensions() {

    const width = galaxy.clientWidth;
    const height = galaxy.clientHeight;

    const isSmallPhone = width <= 350;
    const isPhone = width <= 420;
    const isTablet = width <= 700;

    let radiusX;
    let radiusY;

    if (isSmallPhone) {

        radiusX = width * 0.35;
        radiusY = height * 0.25;

    } else if (isPhone) {

        radiusX = width * 0.36;
        radiusY = height * 0.28;

    } else if (isTablet) {

        radiusX = width * 0.37;
        radiusY = height * 0.30;

    } else {

        radiusX = Math.min(width * 0.36, 285);
        radiusY = Math.min(height * 0.32, 220);

    }

    return {
        width,
        height,
        radiusX,
        radiusY
    };

}


function animatePhotos() {

    const dimensions = getOrbitDimensions();

    const centerX = dimensions.width / 2;

    const centerY = dimensions.height * 0.41;

    const radiusX = dimensions.radiusX;

    const radiusY = dimensions.radiusY;


    if (!reducedMotion && !isDragging) {

        const now = performance.now();

        const elapsed = lastInteractionTime === 0
            ? 16
            : Math.min(now - lastInteractionTime, 40);

        orbitAngle += orbitSpeed * elapsed;

    }

    lastInteractionTime = performance.now();


    photoCards.forEach(function (card, index) {

        const settings = photoSettings[index];

        const angle =
            settings.angle * Math.PI / 180 +
            orbitAngle;

        const x = Math.cos(angle) * radiusX;

        const y = Math.sin(angle) * radiusY;

        const depth = (Math.sin(angle) + 1) / 2;

        const scale = 0.77 + depth * 0.28;

        const rotation =
            settings.tilt +
            Math.sin(angle) * 5;

        const cardWidth = card.offsetWidth;

        const cardHeight = card.offsetHeight;

        const positionX =
            centerX + x - cardWidth / 2;

        const positionY =
            centerY + y - cardHeight / 2;

        card.style.transform =
            "translate3d(" +
            positionX +
            "px, " +
            positionY +
            "px, 0) " +
            "rotate(" + rotation + "deg) " +
            "scale(" + scale + ")";

        card.style.zIndex =
            String(10 + Math.round(depth * 20));

    });


    requestAnimationFrame(animatePhotos);

}


animatePhotos();


/* ==============================
   GESER GALAKSI DENGAN MOUSE
   ATAU LAYAR SENTUH
============================== */

function startDrag(event) {

    if (
        event.target.closest(".photo-card") ||
        event.target.closest("button") &&
        !event.target.closest("#planet")
    ) {
        return;
    }

    isDragging = true;

    lastPointerX = event.clientX;

    lastPointerY = event.clientY;

    dragDistance = 0;

    if (galaxy.setPointerCapture) {

        try {
            galaxy.setPointerCapture(event.pointerId);
        } catch (error) {
            // Tidak semua browser mendukungnya.
        }

    }

}


function moveDrag(event) {

    if (!isDragging) {
        return;
    }

    const differenceX = event.clientX - lastPointerX;

    const differenceY = event.clientY - lastPointerY;

    lastPointerX = event.clientX;

    lastPointerY = event.clientY;

    dragDistance += Math.abs(differenceX);

    orbitAngle += differenceX * 0.008;

    orbitSpeed = differenceX * 0.00035;

    orbitSpeed = Math.max(
        -0.002,
        Math.min(0.002, orbitSpeed)
    );

    if (Math.abs(differenceY) > 2) {

        planet.style.filter =
            "brightness(" +
            Math.min(
                1.12,
                1 + Math.abs(differenceY) * 0.002
            ) +
            ")";

    }

}


function endDrag() {

    isDragging = false;

    planet.style.filter = "";

}


galaxy.addEventListener("pointerdown", startDrag);

window.addEventListener("pointermove", moveDrag);

window.addEventListener("pointerup", endDrag);

window.addEventListener("pointercancel", endDrag);


/* ==============================
   INTERAKSI PLANET
============================== */

function openLetter() {

    letterModal.classList.add("open");

    letterModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeLetter.focus();

}


function closeLetterModal() {

    letterModal.classList.remove("open");

    letterModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


planet.addEventListener("click", function () {

    if (dragDistance > 8) {
        return;
    }

    openLetter();

});


planet.addEventListener("keydown", function (event) {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        openLetter();

    }

});


letterButton.addEventListener("click", openLetter);

bottomLetterButton.addEventListener("click", openLetter);

closeLetter.addEventListener("click", closeLetterModal);


/* Tutup surat ketika area gelap ditekan */

letterModal.addEventListener("click", function (event) {

    if (event.target.dataset.close === "true") {

        closeLetterModal();

    }

});


/* ==============================
   PREVIEW FOTO
============================== */

const photoNames = [

    "Senyum manis Gaby ♡",

    "Satu lagi foto cantikmu ♥",

    "Tetap cantik dengan caramu sendiri ✨",

    "Kenangan kecil untuk Gaby 💗"

];


function openPhoto(index) {

    const card = photoCards[index];

    if (!card) {
        return;
    }

    const image = card.querySelector("img");

    previewImage.src = image.src;

    previewImage.alt = image.alt;

    previewCaption.textContent = photoNames[index];

    photoModal.classList.add("open");

    photoModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closePhoto.focus();

}


function closePhotoModal() {

    photoModal.classList.remove("open");

    photoModal.setAttribute("aria-hidden", "true");

    previewImage.src = "";

    document.body.style.overflow = "";

}


photoCards.forEach(function (card, index) {

    card.addEventListener("click", function (event) {

        event.stopPropagation();

        openPhoto(index);

    });

});


closePhoto.addEventListener("click", closePhotoModal);


photoModal.addEventListener("click", function (event) {

    if (event.target.dataset.photoClose === "true") {

        closePhotoModal();

    }

});


/* ==============================
   TOMBOL ESCAPE UNTUK MENUTUP
============================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLetterModal();

        closePhotoModal();

    }

});


/* ==============================
   CEK FOTO
============================== */

photoCards.forEach(function (card) {

    const image = card.querySelector("img");

    image.addEventListener("error", function () {

        console.error(
            "Foto tidak ditemukan: " + image.getAttribute("src")
        );

        card.style.background = "#39254a";

        image.alt = "Foto belum berhasil dimuat";

    });

});
