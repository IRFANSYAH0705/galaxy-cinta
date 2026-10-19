const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");
const mainContent = document.getElementById("mainContent");

const galaxy = document.getElementById("galaxy");
const galaxySection = document.getElementById("galaxySection");
const planet = document.getElementById("planet");

const letterButton = document.getElementById("letterButton");
const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");
const finishLetter = document.getElementById("finishLetter");

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const fotoGaby = [
    "gaby1.jpeg",
    "gaby2.jpeg",
    "gaby3.jpeg",
    "gaby4.jpeg"
];

let stars = [];
let photos = [];

let width = window.innerWidth;
let height = window.innerHeight;

let angle = 0;
let rotationX = -0.18;
let rotationY = 0;

let targetX = -0.18;
let targetY = 0;

let dragging = false;
let previousX = 0;
let previousY = 0;

let animationStarted = false;
let lastFrame = 0;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// MEMBUAT LATAR BELAKANG BINTANG

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = [];

    const jumlahBintang = Math.min(
        Math.floor((width * height) / 4500),
        220
    );

    for (let i = 0; i < jumlahBintang; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.7 + 0.2,
            speed: Math.random() * 0.6 + 0.2
        });
    }
}

function drawStars(time = 0) {
    ctx.clearRect(0, 0, width, height);

    for (const star of stars) {
        let alpha = star.alpha;

        if (!reducedMotion) {
            alpha *= 0.75 + Math.sin(
                time * 0.001 * star.speed + star.x
            ) * 0.25;
        }

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
    }
}


// MEMBUAT FOTO GALAKSI

function createGalaxyPhotos() {
    photos = [];

    document.querySelectorAll(".orbit-photo").forEach(photo => {
        photo.remove();
    });

    const jumlahFoto = 56;

    for (let i = 0; i < jumlahFoto; i++) {
        const foto = document.createElement("img");

        foto.className = "orbit-photo";

        foto.src = fotoGaby[i % fotoGaby.length];
        foto.alt = `Foto Gaby ${i % fotoGaby.length + 1}`;

        foto.draggable = false;
        foto.loading = "eager";
        foto.decoding = "async";

        foto.onerror = function () {
            console.error("Foto gagal dimuat:", foto.src);
            foto.style.visibility = "hidden";
        };

        galaxy.insertBefore(foto, planet);

        const orbit = 0.45 + Math.random() * 0.55;

        photos.push({
            element: foto,

            angle: (Math.PI * 2 * i) / jumlahFoto,

            orbitX: orbit,
            orbitY: orbit * (0.55 + Math.random() * 0.3),

            speed: (0.025 + Math.random() * 0.035)
                * (i % 2 === 0 ? 1 : -1),

            depth: Math.random(),

            rotation: Math.random() * 36 - 18,

            size: 0.7 + Math.random() * 0.5,

            offset: Math.random() * Math.PI * 2
        });
    }
}


// MENGGERAKKAN FOTO MENGELILINGI PLANET

function animateGalaxy(time = 0) {
    if (!animationStarted) return;

    const delta = lastFrame
        ? Math.min((time - lastFrame) / 1000, 0.05)
        : 0;

    lastFrame = time;

    drawStars(time);

    if (!dragging && !reducedMotion) {
        angle += delta * 0.13;

        targetX += -0.18 * delta;
    }

    rotationX += (targetX - rotationX) * Math.min(delta * 4, 1);
    rotationY += (targetY - rotationY) * Math.min(delta * 4, 1);

    const rect = galaxy.getBoundingClientRect();

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const isMobile = window.innerWidth <= 600;

    const radiusX = Math.min(
        rect.width * (isMobile ? 0.43 : 0.43),
        isMobile ? 220 : 440
    );

    const radiusY = Math.min(
        rect.height * 0.39,
        isMobile ? 205 : 300
    );

    for (const photo of photos) {
        if (!reducedMotion && !dragging) {
            photo.angle += photo.speed * delta;
        }

        const a = photo.angle + angle + photo.offset * 0.05;

        const x = Math.cos(a) * radiusX * photo.orbitX;
        const y = Math.sin(a) * radiusY * photo.orbitY;

        const tiltX = Math.sin(rotationX) * y;
        const tiltY = Math.sin(rotationY) * x;

        const finalX = centerX + x + tiltY;
        const finalY = centerY + y + tiltX;

        const depth = (Math.sin(a) + 1) / 2;

        const scale = photo.size * (
            0.62 + depth * 0.48
        );

        const rotation = photo.rotation
            + Math.sin(a * 0.7) * 5
            + rotationY * 12;

        photo.element.style.zIndex = Math.round(depth * 8);

        photo.element.style.opacity = 0.72 + depth * 0.28;

        photo.element.style.transform = `
            translate(-50%, -50%)
            translate(${finalX - centerX}px, ${finalY - centerY}px)
            scale(${scale})
            rotate(${rotation}deg)
        `;
    }

    requestAnimationFrame(animateGalaxy);
}


// MEMULAI GALAKSI

function startGalaxy() {
    if (animationStarted) return;

    animationStarted = true;

    createGalaxyPhotos();

    lastFrame = 0;

    requestAnimationFrame(animateGalaxy);
}


// INTRO

enterButton.addEventListener("click", () => {
    intro.classList.add("hide");
    mainContent.classList.add("show");

    startGalaxy();
});


// INTERAKSI PLANET DENGAN MOUSE DAN SENTUHAN

planet.addEventListener("pointerdown", event => {
    dragging = true;

    previousX = event.clientX;
    previousY = event.clientY;

    planet.setPointerCapture(event.pointerId);
});

planet.addEventListener("pointermove", event => {
    if (!dragging) return;

    const deltaX = event.clientX - previousX;
    const deltaY = event.clientY - previousY;

    targetY += deltaX * 0.005;
    targetX += deltaY * 0.005;

    targetX = Math.max(-1.1, Math.min(1.1, targetX));
    targetY = Math.max(-1.1, Math.min(1.1, targetY));

    previousX = event.clientX;
    previousY = event.clientY;
});

function stopDragging() {
    dragging = false;
}

planet.addEventListener("pointerup", stopDragging);
planet.addEventListener("pointercancel", stopDragging);
planet.addEventListener("lostpointercapture", stopDragging);


// SURAT RAHASIA

function openLetter() {
    letterModal.classList.add("open");
    letterModal.setAttribute("aria-hidden", "false");

    closeLetter.focus();
}

function hideLetter() {
    letterModal.classList.remove("open");
    letterModal.setAttribute("aria-hidden", "true");
}

letterButton.addEventListener("click", openLetter);
closeLetter.addEventListener("click", hideLetter);
finishLetter.addEventListener("click", hideLetter);

letterModal.addEventListener("click", event => {
    if (event.target === letterModal) {
        hideLetter();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        hideLetter();
    }
});


// RESPONSIVE

window.addEventListener("resize", () => {
    resizeCanvas();
});


// JALANKAN BINTANG SEJAK HALAMAN DIBUKA

resizeCanvas();
drawStars();
