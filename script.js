// ======================================
// BINTANG, METEOR, DAN CAHAYA LUAR ANGKASA
// ======================================

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const effectCanvas = document.getElementById("spaceEffects");
const effectCtx = effectCanvas.getContext("2d");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let width = 0;
let height = 0;
let stars = [];
let meteors = [];
let lastMeteorTime = 0;
let nextMeteorDelay = 1800;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  [canvas, effectCanvas].forEach((element) => {
    element.width = Math.floor(width * dpr);
    element.height = Math.floor(height * dpr);

    element.style.width = width + "px";
    element.style.height = height + "px";
  });

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  effectCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(
    Math.floor((width * height) / 2500),
    350
  );

  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.4 + 0.3,
    alpha: Math.random() * 0.8 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.2 + 0.03
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  stars.forEach((star) => {
    if (!reduceMotion) {
      star.phase += 0.025;
      star.y += star.speed * 0.12;
    }

    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }

    const alpha = reduceMotion
      ? star.alpha
      : star.alpha * (0.6 + 0.4 * Math.sin(star.phase));

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(190, 225, 255, ${alpha})`;
    ctx.fill();
  });
}

function createMeteor() {
  meteors.push({
    x: Math.random() * width * 0.8,
    y: Math.random() * height * 0.35,
    length: Math.random() * 100 + 65,
    speed: Math.random() * 4 + 6,
    opacity: 1,
    angle: Math.PI / 4
  });
}

function drawMeteors(timestamp) {
  effectCtx.clearRect(0, 0, width, height);

  if (
    !reduceMotion &&
    timestamp - lastMeteorTime > nextMeteorDelay
  ) {
    createMeteor();
    lastMeteorTime = timestamp;
    nextMeteorDelay = Math.random() * 2600 + 1700;
  }

  meteors.forEach((meteor) => {
    const tailX =
      meteor.x - Math.cos(meteor.angle) * meteor.length;

    const tailY =
      meteor.y - Math.sin(meteor.angle) * meteor.length;

    const gradient = effectCtx.createLinearGradient(
      meteor.x,
      meteor.y,
      tailX,
      tailY
    );

    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(130,210,255,0.8)");
    gradient.addColorStop(1, "rgba(70,140,255,0)");

    effectCtx.beginPath();
    effectCtx.moveTo(meteor.x, meteor.y);
    effectCtx.lineTo(tailX, tailY);
    effectCtx.strokeStyle = gradient;
    effectCtx.lineWidth = 2;
    effectCtx.stroke();

    meteor.x += meteor.speed * Math.cos(meteor.angle);
    meteor.y += meteor.speed * Math.sin(meteor.angle);
    meteor.opacity -= 0.012;
  });

  meteors = meteors.filter((meteor) =>
    meteor.opacity > 0 &&
    meteor.x < width + 150 &&
    meteor.y < height + 150
  );
}

function animateSpace(timestamp) {
  drawStars();
  drawMeteors(timestamp);
  requestAnimationFrame(animateSpace);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

requestAnimationFrame(animateSpace);

// ======================================
// ISI EMPAT SURAT FOTO
// ======================================

const letters = [
  {
    title: "Untuk Gaby, Bintangku 💙",
    decoration: "💌",
    eyebrow: "MY FIRST LITTLE LETTER",
    paragraphs: [
      "Hai, Gaby sayang. 💙",
      "Aku cuma ingin bilang kalau senyummu punya cara sederhana untuk membuat hari terasa lebih indah. Bahkan ketika hariku biasa saja, melihat kamu tersenyum bisa membuat suasana hatiku menjadi lebih baik.",
      "Aku harap kamu selalu punya alasan untuk bahagia, selalu dikelilingi hal-hal baik, dan tidak pernah lupa betapa berharganya dirimu.",
      "Kalau suatu hari kamu sedang capek, semoga kamu ingat bahwa kamu pantas mendapatkan ketenangan, perhatian, dan kasih sayang.",
      "Terus tersenyum, ya, Gaby. Senyummu itu manis sekali. 💗"
    ],
    signature: "Dengan sayang, untukmu ♡",
    photo: "./gaby1.jpeg"
  },
  {
    title: "Kamu Itu Istimewa 🌷",
    decoration: "🌷",
    eyebrow: "MY SECOND LITTLE LETTER",
    paragraphs: [
      "Hai, Gaby cantik. 🩷",
      "Ada banyak hal indah di dunia ini, tetapi setiap orang punya keistimewaannya sendiri. Buatku, kamu punya cara tersendiri untuk membuat seseorang merasa senang hanya dengan menjadi dirimu sendiri.",
      "Aku suka caramu menjadi kamu. Kamu tidak harus selalu sempurna, tidak harus selalu terlihat kuat, dan tidak perlu selalu menyenangkan semua orang.",
      "Jangan lupa untuk menyayangi dirimu sendiri juga, ya. Kamu layak mendapatkan kebahagiaan yang tulus.",
      "Semoga hari-harimu dipenuhi senyum kecil dan kejutan manis. ✨"
    ],
    signature: "Peluk hangat dari jauh 💗",
    photo: "./gaby2.jpeg"
  },
  {
    title: "Untuk Bintang Kecilku ✨",
    decoration: "⭐",
    eyebrow: "MY THIRD LITTLE LETTER",
    paragraphs: [
      "Gaby, ada sesuatu yang ingin aku sampaikan. 💙",
      "Aku mungkin tidak selalu pandai merangkai kata-kata romantis. Kadang aku juga bingung bagaimana cara mengungkapkan perasaan dengan tepat.",
      "Tapi aku ingin kamu tahu bahwa perhatian kecil pun bisa berarti banyak. Aku ingin melihatmu bahagia, mendengarkan ceritamu, dan ikut tersenyum ketika ada hal baik yang terjadi padamu.",
      "Kalau hari ini terasa berat, istirahatlah sebentar. Kamu tidak harus menyelesaikan semuanya sekaligus.",
      "Semoga besok membawa lebih banyak hal baik untukmu, Gaby. 🌙"
    ],
    signature: "Semoga kamu selalu bahagia ♡",
    photo: "./gaby3.jpeg"
  },
  {
    title: "Surat Paling Spesial 💗",
    decoration: "💖",
    eyebrow: "MY FOURTH LITTLE LETTER",
    paragraphs: [
      "Untuk Gaby yang manis. 💌",
      "Kalau aku bisa memberikan satu harapan untukmu, aku ingin kamu selalu merasa dihargai, disayangi, dan diterima sebagai dirimu sendiri.",
      "Aku harap kamu bertemu banyak hal baik dalam perjalananmu. Semoga impianmu satu per satu menemukan jalannya, dan semoga kamu tidak kehilangan semangat ketika sesuatu belum berjalan sesuai keinginanmu.",
      "Terima kasih sudah menjadi dirimu sendiri. Kamu punya keistimewaan yang tidak harus dibandingkan dengan siapa pun.",
      "Simpan surat kecil ini sebagai pengingat bahwa ada seseorang yang ingin melihatmu tersenyum. 💙"
    ],
    signature: "Kamu berharga, Gaby. ♡",
    photo: "./gaby4.jpeg"
  }
];

// ======================================
// SURAT KHUSUS KELINCI
// ======================================

const bunnyLetter = {
  title: "Pesan Rahasia dari Kelinci 🐰",
  decoration: "🐰💌",
  eyebrow: "A TINY BUNNY HAS A MESSAGE",
  paragraphs: [
    "Psst... Gaby! Ada kelinci kecil yang mau ngomong sesuatu. 🐰",
    "Halo, Gaby! Aku kelinci penjaga surat ini. Aku datang jauh-jauh membawa pesan kecil untuk kamu. Hihi! 💗",
    "Aku punya satu tugas penting: mengingatkan kamu supaya jangan lupa tersenyum, makan dengan baik, istirahat kalau lelah, dan menyayangi diri sendiri.",
    "Kalau hari ini kamu sedih, anggap saja aku sedang mengirim pelukan kelinci paling empuk untukmu. Kalau kamu bahagia, aku ikut melompat-lompat senang! 🐰💕",
    "Terakhir, ada satu rahasia kecil... kamu itu spesial, Gaby. Jadi jangan terlalu keras kepada dirimu sendiri, ya?",
    "Nah, tugasku selesai! Sekarang aku mau makan wortel sambil menjaga surat ini. Sampai jumpa, Gaby! 🥕💙"
  ],
  signature: "Hop hop, penuh sayang! 🐰♡"
};

// ======================================
// PENGATUR JENDELA SURAT
// ======================================

const modal = document.getElementById("letterModal");
const letterTitle = document.getElementById("letterTitle");
const letterDecoration = document.getElementById("letterDecoration");
const letterEyebrow = document.getElementById("letterEyebrow");
const letterContent = document.getElementById("letterContent");

const surpriseArea = document.getElementById("surpriseArea");
const revealPhotoButton = document.getElementById("revealPhoto");
const hiddenPhoto = document.getElementById("hiddenPhoto");
const surpriseImage = document.getElementById("surpriseImage");

const closeLetterButton = document.getElementById("closeLetter");
const closeLetterBottom = document.getElementById("closeLetterBottom");

let activeLetter = null;
let lastFocusedElement = null;

function openLetter(letter) {
  lastFocusedElement = document.activeElement;
  activeLetter = letter;

  letterTitle.textContent = letter.title;
  letterDecoration.textContent = letter.decoration;
  letterEyebrow.textContent = letter.eyebrow;

  letterContent.replaceChildren();

  letter.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    letterContent.appendChild(p);
  });

  const signature = document.createElement("p");
  signature.className = "letter-signature";
  signature.textContent = letter.signature;
  letterContent.appendChild(signature);

  hiddenPhoto.hidden = true;

  // Hanya surat foto yang memiliki kejutan foto.
  surpriseArea.hidden = !letter.photo;

  if (letter.photo) {
    surpriseImage.src = letter.photo;
    revealPhotoButton.hidden = false;
    revealPhotoButton.textContent = "Buka kejutan untukmu ♥";
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  closeLetterButton.focus();
}

function closeLetter() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  activeLetter = null;

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Klik foto untuk membuka surat yang sesuai.
document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    const index = Number(card.dataset.letter);

    if (letters[index]) {
      openLetter(letters[index]);
    }
  });
});

// Klik kelinci untuk membuka surat tambahan.
document.getElementById("bunnyLetterButton").addEventListener("click", () => {
  openLetter(bunnyLetter);
});

// Tampilkan foto setelah tombol kejutan diklik.
revealPhotoButton.addEventListener("click", () => {
  if (!activeLetter || !activeLetter.photo) {
    return;
  }

  hiddenPhoto.hidden = false;
  revealPhotoButton.hidden = true;

  hiddenPhoto.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "nearest"
  });
});

// Tombol untuk menutup surat.
closeLetterButton.addEventListener("click", closeLetter);
closeLetterBottom.addEventListener("click", closeLetter);

// Klik area gelap untuk menutup surat.
modal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeLetter();
  }
});

// Tombol Escape untuk menutup surat.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeLetter();
  }
});
