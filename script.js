/* =========================
   PENGATURAN GALAKSI
========================= */

const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

let width;
let height;
let stars = [];
let shootingStars = [];
let animationFrame;


/* =========================
   UKURAN CANVAS
========================= */

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    createStars();
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}


/* =========================
   MEMBUAT BINTANG
========================= */

function createStars() {
    const total = Math.min(
        Math.floor((width * height) / 1800),
        450
    );

    stars = [];

    for (let i = 0; i < total; i++) {
        stars.push({
            x: random(0, width),
            y: random(0, height),
            radius: random(0.5, 1.8),
            alpha: random(0.2, 0.9),
            speed: random(0.003, 0.018),
            phase: random(0, Math.PI * 2)
        });
    }
}


/* =========================
   BINTANG JATUH
========================= */

function createShootingStar() {
    shootingStars.push({
        x: random(width * 0.2, width * 1.1),
        y: random(-50, height * 0.45),
        length: random(60, 150),
        speed: random(5, 10),
        angle: random(2.1, 2.55),
        alpha: 1
    });
}

function drawShootingStars() {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        const endX = star.x - Math.cos(star.angle) * star.length;
        const endY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            endX,
            endY
        );

        gradient.addColorStop(0, "rgba(255,255,255,0.95)");
        gradient.addColorStop(0.35, "rgba(225,170,255,0.7)");
        gradient.addColorStop(1, "rgba(225,170,255,0)");

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = star.alpha;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);

        ctx.fillStyle = "#ffffff";
        ctx.fill();

        star.x -= Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        star.alpha -= 0.008;

        if (
            star.alpha <= 0 ||
            star.x < -200 ||
            star.y > height + 100
        ) {
            shootingStars.splice(i, 1);
        }
    }

    ctx.globalAlpha = 1;
}


/* =========================
   MENGGAMBAR BINTANG
========================= */

function drawStars(time) {
    for (const star of stars) {
        const pulse = Math.sin(
            time * star.speed + star.phase
        );

        const alpha = star.alpha * (0.65 + pulse * 0.35);

        ctx.globalAlpha = Math.max(0.1, alpha);

        ctx.beginPath();
        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ffffff";
        ctx.fill();
    }

    ctx.globalAlpha = 1;
}


/* =========================
   ANIMASI GALAKSI
========================= */

let lastShootingStar = 0;

function animateGalaxy(time) {
    ctx.clearRect(0, 0, width, height);

    drawStars(time);

    if (time - lastShootingStar > random(1800, 3500)) {
        createShootingStar();
        lastShootingStar = time;
    }

    drawShootingStars();

    animationFrame = requestAnimationFrame(animateGalaxy);
}

resizeCanvas();

animationFrame = requestAnimationFrame(animateGalaxy);

window.addEventListener("resize", resizeCanvas);


/* =========================
   INTRO PEMBUKA
========================= */

const intro = document.getElementById("intro");
const enterButton = document.getElementById("enterButton");
const mainContent = document.getElementById("mainContent");

enterButton.addEventListener("click", function () {
    intro.classList.add("hide");
    mainContent.classList.add("show");

    setTimeout(function () {
        intro.style.display = "none";
    }, 1000);
});


/* =========================
   SURAT RAHASIA
========================= */

const openLetter = document.getElementById("openLetter");
const closeLetter = document.getElementById("closeLetter");
const letterOverlay = document.getElementById("letterOverlay");
const planet = document.getElementById("planet");

function showLetter() {
    letterOverlay.classList.add("open");

    createHearts(
        window.innerWidth / 2,
        window.innerHeight / 2
    );
}

function hideLetter() {
    letterOverlay.classList.remove("open");
}

openLetter.addEventListener("click", showLetter);

closeLetter.addEventListener("click", hideLetter);

planet.addEventListener("click", showLetter);

letterOverlay.addEventListener("click", function (event) {
    if (event.target === letterOverlay) {
        hideLetter();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        hideLetter();
    }
});


/* =========================
   EFEK HATI
========================= */

const effects = document.getElementById("effects");

function createHearts(x, y) {
    const symbols = ["♥", "♡", "✦"];

    for (let i = 0; i < 9; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent = symbols[
            Math.floor(Math.random() * symbols.length)
        ];

        heart.style.left = (x + random(-70, 70)) + "px";
        heart.style.top = (y + random(-20, 20)) + "px";
        heart.style.animationDelay = random(0, 0.4) + "s";
        heart.style.fontSize = random(13, 25) + "px";

        effects.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 2500);
    }
}


/* =========================
   GERAKAN ORBIT FOTO
========================= */

const universe = document.getElementById("universe");
const photoOrbit = document.getElementById("photoOrbit");
const planetArea = document.getElementById("planetArea");

let orbitAngle = 0;
let orbitSpeed = 0.13;
let orbitDragging = false;
let orbitStartX = 0;
let lastOrbitX = 0;
let orbitVelocity = 0;

let pointerStartTime = 0;
let movedOrbit = false;

const cards = document.querySelectorAll(".photo-card");

function animateOrbit() {
    if (!orbitDragging) {
        orbitAngle += orbitSpeed + orbitVelocity;

        orbitVelocity *= 0.96;

        if (Math.abs(orbitVelocity) < 0.005) {
            orbitVelocity = 0;
        }
    }

    photoOrbit.style.transform =
        "translate(-50%, -50%) rotate(" + orbitAngle + "deg)";

    cards.forEach(function (card, index) {
        const angle = (orbitAngle + index * 90) * Math.PI / 180;

        const radiusX = window.innerWidth <= 520 ? 145 : 270;
        const radiusY = window.innerWidth <= 520 ? 155 : 220;

        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;

        const depth = (Math.sin(angle) + 1) / 2;
        const scale = 0.72 + depth * 0.35;

        card.style.left = "50%";
        card.style.top = "50%";

        card.style.transform =
            "translate(-50%, -50%) " +
            "translate(" + x + "px, " + y + "px) " +
            "scale(" + scale + ") " +
            "rotate(" + Math.sin(angle) * 12 + "deg)";

        card.style.zIndex = Math.round(depth * 20);
        card.style.opacity = 0.75 + depth * 0.25;
    });

    requestAnimationFrame(animateOrbit);
}

requestAnimationFrame(animateOrbit);


/* =========================
   MENGGESER GALAKSI
========================= */

function startOrbitDrag(event) {
    if (event.button !== undefined && event.button !== 0) {
        return;
    }

    orbitDragging = true;
    movedOrbit = false;

    orbitStartX = event.clientX;
    lastOrbitX = event.clientX;
    pointerStartTime = Date.now();
    orbitVelocity = 0;

    if (universe.setPointerCapture && event.pointerId !== undefined) {
        try {
            universe.setPointerCapture(event.pointerId);
        } catch (error) {
            // Pointer capture tidak wajib.
        }
    }
}

function moveOrbitDrag(event) {
    if (!orbitDragging) {
        return;
    }

    const difference = event.clientX - lastOrbitX;

    if (Math.abs(event.clientX - orbitStartX) > 5) {
        movedOrbit = true;
    }

    orbitAngle += difference * 0.7;
    orbitVelocity = difference * 0.025;

    lastOrbitX = event.clientX;
}

function endOrbitDrag() {
    orbitDragging = false;

    if (Date.now() - pointerStartTime < 180 && !movedOrbit) {
        orbitVelocity = 0;
    }
}

universe.addEventListener("pointerdown", startOrbitDrag);

window.addEventListener("pointermove", moveOrbitDrag);

window.addEventListener("pointerup", endOrbitDrag);

window.addEventListener("pointercancel", endOrbitDrag);


/* =========================
   INTERAKSI PLANET
========================= */

planetArea.addEventListener("pointerdown", function (event) {
    event.stopPropagation();
});

planet.addEventListener("click", function () {
    createHearts(
        window.innerWidth / 2,
        window.innerHeight / 2
    );
});


/* =========================
   EFEK KLIK LATAR
========================= */

universe.addEventListener("click", function (event) {
    if (
        event.target.closest(".photo-card") ||
        event.target.closest(".planet-area")
    ) {
        return;
    }

    createHearts(event.clientX, event.clientY);
});
